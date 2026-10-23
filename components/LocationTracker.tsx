"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

interface CoordsData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export default function LocationTracker() {
  useEffect(() => {
    // Prevent duplicate calls in the same tab session
    const sessionTracked = sessionStorage.getItem("portfolio_location_tracked");
    if (sessionTracked) return;

    const trackVisitor = async () => {
      let preciseCoords: CoordsData | null = null;

      // Check if location permission is ALREADY granted WITHOUT triggering a prompt
      try {
        if (typeof window !== "undefined" && navigator?.permissions?.query) {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
          });

          // ONLY query coordinates if state is already 'granted' (silent, zero prompt)
          if (permissionStatus.state === "granted" && navigator.geolocation) {
            preciseCoords = await new Promise<CoordsData | null>((resolve) => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  resolve({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                  });
                },
                () => resolve(null),
                {
                  enableHighAccuracy: true,
                  timeout: 4500,
                  maximumAge: 120000,
                }
              );
            });
          }
          // If state is 'prompt' or 'denied', we intentionally do nothing so no popup appears
        }
      } catch {
        // Permissions API error or unsupported: do not call getCurrentPosition to prevent popup
      }

      try {
        const response = await fetch("/api/track-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || "direct",
            hasPreciseGps: Boolean(preciseCoords),
            latitude: preciseCoords?.latitude ?? null,
            longitude: preciseCoords?.longitude ?? null,
            accuracy: preciseCoords?.accuracy ?? null,
          }),
        });

        if (!response.ok) return;

        const result = await response.json();

        if (result.success) {
          // Send custom event to Vercel Analytics with detailed area & maps link
          track("visitor_area", {
            area: result.detailedArea || result.area || "Unknown Area",
            city: result.city || "Unknown",
            region: result.region || "Unknown",
            country: result.country || "Unknown",
            suburb: result.suburb || "N/A",
            postcode: result.postcode || "N/A",
            gps_active: result.hasPreciseGps ? "true" : "false",
            maps_url: result.mapsUrl || "N/A",
            path: window.location.pathname,
          });

          sessionStorage.setItem("portfolio_location_tracked", "true");
        }
      } catch {
        // Silently catch tracking errors
      }
    };

    trackVisitor();
  }, []);

  return null;
}
