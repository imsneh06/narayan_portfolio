import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleLocationTracking(req);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // Body is optional
  }
  return handleLocationTracking(req, body);
}

interface NominatimAddress {
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  residential?: string;
  city_district?: string;
  subdistrict?: string;
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
  display_name?: string;
}

async function reverseGeocodeCoords(
  lat: number | string,
  lon: number | string
): Promise<{
  detailedArea: string;
  suburb: string | null;
  postcode: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  displayName: string | null;
} | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&zoom=18&addressdetails=1`;

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Narayan-Portfolio-Tracker/2.0 (contact: portfolio-analytics)",
        "Accept-Language": "en",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data: NominatimResponse = await res.json();
    const addr = data.address;
    if (!addr) return null;

    const city = addr.city || addr.town || addr.village || addr.county || null;
    const suburb = addr.suburb || addr.neighbourhood || addr.city_district || addr.subdistrict || null;
    const localPoint = addr.residential || addr.road || null;

    // Build granular area string (e.g. "Sector V, Salt Lake, Kolkata")
    const areaComponents = [localPoint, suburb, city].filter(Boolean);
    const detailedArea = areaComponents.length > 0 ? areaComponents.join(", ") : (city || "Unknown Area");

    return {
      detailedArea,
      suburb,
      postcode: addr.postcode || null,
      city,
      region: addr.state || null,
      country: addr.country || null,
      displayName: data.display_name || null,
    };
  } catch {
    return null;
  }
}

async function handleLocationTracking(
  req: NextRequest,
  body?: Record<string, unknown>
) {
  try {
    // 1. Extract Vercel Edge Geolocation headers
    const rawCity = req.headers.get("x-vercel-ip-city");
    let city = rawCity ? decodeURIComponent(rawCity) : null;
    let region = req.headers.get("x-vercel-ip-country-region") || null;
    let country = req.headers.get("x-vercel-ip-country") || null;
    let latitude = req.headers.get("x-vercel-ip-latitude") || null;
    let longitude = req.headers.get("x-vercel-ip-longitude") || null;
    let timezone = req.headers.get("x-vercel-ip-timezone") || null;

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown";

    const path = typeof body?.path === "string" ? body.path : "/";
    const referrer =
      typeof body?.referrer === "string"
        ? body.referrer
        : req.headers.get("referer") || "direct";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const timestamp = new Date().toISOString();

    const clientLat = typeof body?.latitude === "number" ? body.latitude : null;
    const clientLon = typeof body?.longitude === "number" ? body.longitude : null;
    const accuracy = typeof body?.accuracy === "number" ? Math.round(body.accuracy) : null;
    const hasPreciseGps = Boolean(body?.hasPreciseGps && clientLat && clientLon);

    let detailedArea: string | null = null;
    let suburb: string | null = null;
    let postcode: string | null = null;
    let mapsUrl: string | null = null;

    // 2. If precise client GPS is active & available, reverse geocode to exact area inside city
    if (hasPreciseGps && clientLat && clientLon) {
      latitude = String(clientLat);
      longitude = String(clientLon);
      mapsUrl = `https://www.google.com/maps?q=${clientLat},${clientLon}`;

      const geo = await reverseGeocodeCoords(clientLat, clientLon);
      if (geo) {
        detailedArea = geo.detailedArea;
        suburb = geo.suburb;
        postcode = geo.postcode;
        if (geo.city) city = geo.city;
        if (geo.region) region = geo.region;
        if (geo.country) country = geo.country;
      }
    }

    // 3. Fallback for local development or non-Vercel environment when headers are missing
    if (!city && !hasPreciseGps) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          headers: { "User-Agent": "Narayan-Portfolio-Tracker/2.0" },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          city = data.city || null;
          region = data.region_code || data.region || null;
          country = data.country_code || data.country_name || null;
          latitude = data.latitude ? String(data.latitude) : null;
          longitude = data.longitude ? String(data.longitude) : null;
          timezone = data.timezone || null;
        }
      } catch {
        // Fallback gracefully
      }
    }

    const safeCity = city || "Unknown City";
    const safeRegion = region || "Unknown Region";
    const safeCountry = country || "Unknown Country";
    const area = detailedArea || `${safeCity}, ${safeRegion}`;

    if (!mapsUrl && latitude && longitude) {
      mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    // 4. Structured log for Vercel Runtime Logs (Dashboard -> Project -> Logs)
    const logTag = hasPreciseGps ? "🎯 [VISITOR_PRECISE_LOCATION]" : "🌐 [VISITOR_LOCATION]";
    console.log(
      `${logTag} Area: "${area}" | City: "${safeCity}" | Suburb: "${suburb || "N/A"}" | Postcode: "${postcode || "N/A"}" | Maps: ${mapsUrl || "N/A"} | GPS: ${hasPreciseGps ? `Active (±${accuracy}m)` : "IP-based (No GPS active)"} | Path: ${path} | IP: ${ip} | Time: ${timestamp}`
    );

    return NextResponse.json({
      success: true,
      city: safeCity,
      region: safeRegion,
      country: safeCountry,
      area,
      detailedArea: area,
      suburb: suburb || null,
      postcode: postcode || null,
      latitude,
      longitude,
      accuracy,
      hasPreciseGps,
      mapsUrl: mapsUrl || null,
      timezone,
      timestamp,
    });
  } catch (error) {
    console.error("[VISITOR_LOCATION_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to track location" },
      { status: 500 }
    );
  }
}
