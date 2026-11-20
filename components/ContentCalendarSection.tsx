"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCalendar, 
  FiList, 
  FiSearch, 
  FiCopy, 
  FiCheck, 
  FiChevronDown, 
  FiVideo, 
  FiLayers,
  FiZap,
  FiEye,
  FiFilter
} from "react-icons/fi";

interface PostItem {
  id: number;
  d: string;
  cat: "Branding" | "Promotional" | "Social Event" | "Informational/Educational";
  by: string;
  type?: string;
  cap: string;
  plot: string[];
  idea: string;
}

const POSTS: PostItem[] = [
  {
    id: 1,
    d: "2025-12-01",
    cat: "Branding",
    by: "Sneh",
    cap: "“Winters get colder. Purity stays constant. This December, stay hydrated the pure way.”",
    plot: [
      "Visual: A frosty morning window, someone opens it, takes a sip from a chilled Bisleri bottle.",
      "Breathes fog in the cold ambience",
      "Final frame: Bisleri bottle with tagline “Purity that stays. Even in winters.”"
    ],
    idea: "Show Bisleri as the constant purity in the cold winter season."
  },
  {
    id: 2,
    d: "2025-12-02",
    cat: "Promotional",
    by: "Sneh",
    cap: "“This party season, focus on fun. We’ll handle the hydration. Order your party pack now!”",
    plot: [
      "Christmas lights with New Year confetti",
      "A table full of food & Bisleri bottles",
      "Text: “Party Hydration Pack – Order Now”"
    ],
    idea: "Promote Bisleri bulk-buy for home parties."
  },
  {
    id: 3,
    d: "2025-12-03",
    cat: "Social Event",
    by: "Sneh",
    cap: "“Team Cold Bisleri in December? Comment if you agree!”",
    plot: [
      "Design: Freezing weather visual",
      "Text overlay: “The weather is cold. But my loyalty to cold Bisleri is colder.”"
    ],
    idea: "A fun Gen-Z meme tying cold weather with cold Bisleri."
  },
  {
    id: 4,
    d: "2025-12-04",
    cat: "Informational/Educational",
    by: "Sneh",
    cap: "“Winter reduces thirst, not water needs. Stay hydrated, stay healthy.”",
    plot: [
      "Info/graphic with:",
      "Dry skin",
      "Low thirst response",
      "Dehydration risk in winter",
      "Recommended 2–2.5L/day"
    ],
    idea: "Teach users why winter hydration matters."
  },
  {
    id: 5,
    d: "2025-12-08",
    cat: "Branding",
    by: "Sneh",
    cap: "“Every drop has a journey. 10 steps. Zero compromise. Only purity.”",
    plot: [
      "Fast cuts of purification stages",
      "UV treatment, ozonization, RO shots",
      "Scientist placing a droplet under microscope",
      "End with the bottle filling line"
    ],
    idea: "Show the 10-step purification process in a modern, crisp reel."
  },
  {
    id: 6,
    d: "2025-12-10",
    cat: "Promotional",
    by: "Sneh",
    cap: "“New Year, new habits. Pure water delivered to your door every day.”",
    plot: [
      "Doorstep delivery visual",
      "A Bisleri truck",
      "Text: “Start 2026 with pure hydration – Order now.”"
    ],
    idea: "Promote monthly subscriptions at year end."
  },
  {
    id: 7,
    d: "2025-12-12",
    cat: "Social Event",
    by: "Sneh",
    cap: "“POV: The only thing keeping you going this December.”",
    plot: [
      "Camera POV opening fridge",
      "Everything dark except glowing Bisleri bottle",
      "Dramatic sound effect",
      "Hand grabs bottle then sips"
    ],
    idea: "Show a relatable late-night moment."
  },
  {
    id: 8,
    d: "2025-12-13",
    cat: "Informational/Educational",
    by: "Sneh",
    cap: "“Clean habits create a cleaner planet. Recycle responsibly - every bottle counts.”",
    plot: [
      "Image of crushed bottles going into recycling",
      "Tagline: “Every bottle deserves a second life.”"
    ],
    idea: "Connect to Bisleri’s recycling initiative."
  },
  {
    id: 9,
    d: "2025-12-15",
    cat: "Branding",
    by: "Sneh",
    cap: "“Everyday moments feel lighter with pure hydration.”",
    plot: [
      "Visuals:",
      "Gym workout",
      "Road trip",
      "Family dinner",
      "Office desk",
      "Final: “One bottle. Many moments.”"
    ],
    idea: "Show Bisleri in everyday life moments."
  },
  {
    id: 10,
    d: "2025-12-16",
    cat: "Promotional",
    by: "Sneh",
    cap: "“Wherever December takes you, take purity with you.”",
    plot: [
      "POV shot packing a bag",
      "Passport, charger, then Bisleri bottle",
      "Text: “Don’t travel without purity.”"
    ],
    idea: "December travel spike to promote 500ml bottles."
  },
  {
    id: 11,
    d: "2025-12-18",
    cat: "Social Event",
    by: "Sneh",
    cap: "“Let’s settle this winter debate. Vote in the poll!”",
    plot: [
      "Design text: “How do you drink your Bisleri in winter?”",
      "Ice Cold with ice picture",
      "Room Temperature with thermometer picture"
    ],
    idea: "Story post for engagement."
  },
  {
    id: 12,
    d: "2025-12-20",
    cat: "Informational/Educational",
    by: "Sneh",
    cap: "“Merry Christmas! May your celebrations be joyful and your hydration pure.”",
    plot: [
      "A cozy Christmas table",
      "Green Bisleri bottles matching Christmas theme",
      "Text: “Purity for every celebration.”"
    ],
    idea: "Feel-good festive post."
  },
  {
    id: 13,
    d: "2025-12-23",
    cat: "Branding",
    by: "Sneh",
    type: "Reel/Video",
    cap: "“As the year slows down, your hydration shouldn’t. Reset with purity before stepping into 2026.”",
    plot: [
      "Soft morning light",
      "Someone journaling their year goals",
      "Takes a sip of Bisleri",
      "Text overlay: “Reset. Refresh. Hydrate.”"
    ],
    idea: "Encourage people to reset, refresh and end the year on a pure note."
  },
  {
    id: 14,
    d: "2025-12-25",
    cat: "Promotional",
    by: "Sneh",
    cap: "“Big night tomorrow? Keep the celebrations fun and the hydration pure. Stock your party essentials today!”",
    plot: [
      "Table being set for NYE party",
      "Sparkling decorations",
      "Bisleri bottles arranged beside snacks",
      "Flashing text: “Hydration Before Celebration”"
    ],
    idea: "Promote stocking up hydration for New Year’s Eve parties."
  },
  {
    id: 15,
    d: "2025-12-27",
    cat: "Social Event",
    by: "Sneh",
    cap: "“Your moments make our December pure. Share your Bisleri picture with #BisleriMoments and get featured on our page!”",
    plot: [
      "Reel with fast cuts of people clicking selfies with Bisleri in:",
      "Travel",
      "Home",
      "Gym",
      "Office",
      "Text: “Share your #BisleriMoments & get featured!”"
    ],
    idea: "Create user-generated content by making people share their winter/festive photos with Bisleri."
  },
  {
    id: 16,
    d: "2025-12-29",
    cat: "Informational/Educational",
    by: "Sneh",
    cap: "“In winters, your thirst reflex drops by almost 40%. But your body still needs the same amount of water. Stay hydrated, even when you don’t feel it.”",
    plot: [
      "Person working indoors in sweater with no thirst",
      "Text pops: “Did you know?”",
      "Body heat rises & thirst sense decreases",
      "Cut to sipping Bisleri",
      "End card: “Don’t skip hydration this winter.”"
    ],
    idea: "Educate people about the “winter thirst suppression phenomenon” and why they must drink water even when they don’t feel thirsty."
  }
];

const CATEGORIES = [
  "Branding",
  "Promotional",
  "Social Event",
  "Informational/Educational"
] as const;

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORY_STYLES = {
  Branding: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
    borderLeft: "border-l-blue-400",
    bgSoft: "bg-blue-500/[0.04]",
    accent: "text-blue-400"
  },
  Promotional: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
    borderLeft: "border-l-amber-400",
    bgSoft: "bg-amber-500/[0.04]",
    accent: "text-amber-400"
  },
  "Social Event": {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dot: "bg-purple-400",
    borderLeft: "border-l-purple-400",
    bgSoft: "bg-purple-500/[0.04]",
    accent: "text-purple-400"
  },
  "Informational/Educational": {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
    borderLeft: "border-l-emerald-400",
    bgSoft: "bg-emerald-500/[0.04]",
    accent: "text-emerald-400"
  }
};

const LABEL_REGEX = /^(Visuals?|Design text|Design|Text overlay|Text pops|Flashing text|Text|Final frame|Final|Tagline|End card):\s*(.+)$/i;

export default function ContentCalendarSection({ embedded = false }: { embedded?: boolean }) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      if (selectedCat && post.cat !== selectedCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          post.cap,
          post.plot.join(" "),
          post.idea,
          post.cat,
          post.type || ""
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCat, searchQuery]);

  // Expand / collapse all toggle
  const handleToggleExpandAll = () => {
    const nextState = !expandedAll;
    setExpandedAll(nextState);
    const updated: Record<number, boolean> = {};
    POSTS.forEach((p) => {
      updated[p.id] = nextState;
    });
    setOpenItems(updated);
  };

  const toggleSingleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCaption = (id: number, text: string) => {
    const cleanText = text.replace(/^“|”$/g, "");
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  const handleSelectCalendarDay = (postId: number) => {
    setView("list");
    setSelectedCat(null);
    setSearchQuery("");
    setOpenItems((prev) => ({ ...prev, [postId]: true }));
    setHighlightedId(postId);

    setTimeout(() => {
      const el = document.getElementById(`calendar-post-${postId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    setTimeout(() => {
      setHighlightedId(null);
    }, 2500);
  };

  // Calendar calculations for Dec 2025:
  // Dec 1, 2025 is a Monday (0 offset in Mon-Sun week)
  const daysInMonth = 31;
  const firstDayOffset = 0; // Dec 1, 2025 is Monday

  return (
    <div className={embedded ? "w-full" : "py-12 max-w-6xl mx-auto px-4 sm:px-6"}>
      <div className="rounded-2xl border border-dark-borderSubtle bg-dark-surface overflow-hidden">
        {/* Calendar Header Bar */}
        <div className="p-6 sm:p-8 border-b border-dark-borderSubtle bg-dark-surface flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wider uppercase text-warm-muted">
              Bisleri · Multi-channel strategy
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-warm-white tracking-tight mt-1">
              December 2025 Content Plan
            </h3>
            <p className="text-xs sm:text-sm text-warm-gray mt-1 max-w-xl">
              Ready-to-publish copywriting, shot-by-shot visual sequences, and psychological hooks for every scheduled post.
            </p>
          </div>

          {/* Quick Action / View Switcher in Banner */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-dark-surface2 border border-dark-borderSubtle self-start md:self-auto">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                view === "list"
                  ? "bg-dark-surface text-warm-white border border-dark-border"
                  : "text-warm-muted hover:text-warm-white"
              }`}
            >
              <FiList className="w-3.5 h-3.5" />
              List
            </button>
            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                view === "calendar"
                  ? "bg-dark-surface text-warm-white border border-dark-border"
                  : "text-warm-muted hover:text-warm-white"
              }`}
            >
              <FiCalendar className="w-3.5 h-3.5" />
              Grid
            </button>
          </div>
        </div>

        {/* Interactive Controls & Filters */}
        <div className="p-4 sm:p-6 border-b border-dark-borderSubtle bg-dark-bg/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search captions, visual shots, hooks, or topics..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-dark-borderSubtle bg-dark-surface text-xs text-warm-white placeholder-warm-muted focus:outline-none focus:border-dark-border transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-warm-muted hover:text-warm-white font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse All Button */}
            {view === "list" && (
              <button
                type="button"
                onClick={handleToggleExpandAll}
                className="px-3.5 py-2 text-xs font-mono rounded-lg border border-dark-borderSubtle bg-dark-surface hover:border-dark-border text-warm-gray hover:text-warm-white transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                {expandedAll ? "Collapse details" : "Expand details"}
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            <span className="text-warm-muted mr-1 flex items-center gap-1">
              <FiFilter className="w-3 h-3" /> Pillar:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCat(null)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                selectedCat === null
                  ? "bg-dark-surface2 text-warm-white border-dark-border font-medium"
                  : "bg-dark-surface text-warm-muted border-dark-borderSubtle hover:text-warm-white"
              }`}
            >
              All Posts
              <span className="text-[10px] tabular-nums text-warm-muted">
                {POSTS.length}
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = POSTS.filter((p) => p.cat === cat).length;
              const isSelected = selectedCat === cat;
              const style = CATEGORY_STYLES[cat];

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(isSelected ? null : cat)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                    isSelected
                      ? "bg-dark-surface2 text-warm-white border-dark-border font-medium"
                      : "bg-dark-surface text-warm-muted border-dark-borderSubtle hover:text-warm-white"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {cat}
                  <span className="text-[10px] tabular-nums text-warm-muted">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Post Count Indicator */}
        <div className="px-6 py-2.5 bg-dark-bg/20 border-b border-dark-borderSubtle text-xs font-mono text-warm-muted flex items-center justify-between">
          <span>
            Showing <span className="text-warm-white tabular-nums">{filteredPosts.length}</span> of {POSTS.length} posts
          </span>
          {selectedCat && (
            <button
              onClick={() => setSelectedCat(null)}
              className="text-warm-white hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {view === "list" ? (
              /* ================= LIST VIEW ================= */
              <motion.div
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {filteredPosts.length === 0 ? (
                  <div className="py-14 text-center text-warm-muted font-mono">
                    <p className="text-sm">No posts match your search or filter.</p>
                    <button
                      onClick={() => {
                        setSelectedCat(null);
                        setSearchQuery("");
                      }}
                      className="mt-2 text-xs text-warm-white hover:underline"
                    >
                      Clear search and filters
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => {
                    const dayNumber = post.d.split("-")[2];
                    const style = CATEGORY_STYLES[post.cat];
                    const isOpen = openItems[post.id] ?? expandedAll;
                    const isHighlighted = highlightedId === post.id;

                    return (
                      <div
                        key={post.id}
                        id={`calendar-post-${post.id}`}
                        className={`rounded-xl border transition-colors p-5 sm:p-6 bg-dark-surface ${
                          style.borderLeft
                        } border-l-2 ${
                          isHighlighted
                            ? "border-accent-blue bg-dark-surface2"
                            : "border-dark-borderSubtle hover:border-dark-border"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                          {/* Date Block */}
                          <div className="flex sm:flex-col items-center justify-center min-w-[64px] px-2.5 py-1.5 rounded-lg bg-dark-surface2 border border-dark-borderSubtle text-center self-start">
                            <span className="font-mono text-lg font-semibold text-warm-white leading-none tabular-nums">
                              {dayNumber}
                            </span>
                            <span className="font-mono text-[10px] text-warm-muted uppercase tracking-wider mt-1">
                              Dec 2025
                            </span>
                          </div>

                          {/* Content Body */}
                          <div className="flex-1 min-w-0">
                            {/* Metadata Tags */}
                            <div className="flex flex-wrap items-center gap-2 mb-2.5 font-mono text-xs">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] ${style.badge}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                                {post.cat}
                              </span>

                              {post.type && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-dark-surface2 text-warm-gray border border-dark-borderSubtle">
                                  <FiVideo className="w-3 h-3 text-warm-muted" />
                                  {post.type}
                                </span>
                              )}

                              <span className="text-[11px] text-warm-muted">
                                Strategist: {post.by}
                              </span>
                            </div>

                            {/* Primary Caption */}
                            <p className="text-sm sm:text-base font-normal text-warm-white leading-relaxed mb-3">
                              {post.cap}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                              <button
                                type="button"
                                onClick={() => handleCopyCaption(post.id, post.cap)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dark-borderSubtle bg-dark-surface2 hover:border-dark-border text-warm-gray hover:text-warm-white transition-colors"
                              >
                                {copiedId === post.id ? (
                                  <>
                                    <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <FiCopy className="w-3.5 h-3.5 text-warm-muted" />
                                    <span>Copy caption</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleSingleItem(post.id)}
                                className="inline-flex items-center gap-1 text-warm-gray hover:text-warm-white py-1 transition-colors"
                              >
                                <span>Plot and visual breakdown</span>
                                <FiChevronDown
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Expandable Breakdown Drawer */}
                            {isOpen && (
                              <div className="mt-4 pt-4 border-t border-dark-borderSubtle grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Shot Sequence */}
                                <div className="lg:col-span-2 space-y-2">
                                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-warm-muted">
                                    Plot / visual execution
                                  </h4>
                                  <div className="space-y-1.5">
                                    {post.plot.map((line, idx) => {
                                      const match = line.match(LABEL_REGEX);
                                      const isHeading = /:\s*$/.test(line);

                                      if (isHeading) {
                                        return (
                                          <div
                                            key={idx}
                                            className="text-xs font-medium text-warm-white mt-1.5"
                                          >
                                            {line.replace(/:\s*$/, "")}
                                          </div>
                                        );
                                      }

                                      return (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2 text-xs text-warm-gray"
                                        >
                                          <span className="w-4 h-4 rounded bg-dark-surface2 border border-dark-borderSubtle text-warm-muted text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                                            {idx + 1}
                                          </span>
                                          <div>
                                            {match ? (
                                              <>
                                                <span className="font-mono text-[10px] uppercase text-warm-muted mr-1.5">
                                                  [{match[1]}]
                                                </span>
                                                <span>{match[2]}</span>
                                              </>
                                            ) : (
                                              <span>{line}</span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Strategic Ideation Note */}
                                <div className="p-3.5 rounded-lg bg-dark-surface2 border border-dark-borderSubtle self-start space-y-1">
                                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-warm-muted">
                                    Strategic ideation
                                  </h4>
                                  <p className="text-xs text-warm-gray leading-relaxed">
                                    &ldquo;{post.idea}&rdquo;
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            ) : (
              /* ================= CALENDAR GRID VIEW ================= */
              <motion.div
                key="calendar-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-4 sm:p-6 rounded-xl border border-dark-borderSubtle bg-dark-surface">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm sm:text-base font-semibold text-warm-white">
                      December 2025 Campaign Schedule
                    </h4>
                    <span className="text-xs font-mono text-warm-muted">
                      Select any scheduled day to view full details
                    </span>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center font-mono">
                    {DOW.map((day) => (
                      <div
                        key={day}
                        className="text-[11px] uppercase text-warm-muted py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid Days */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {/* Leading offset days (none needed since Dec 1 is Monday) */}
                    {Array.from({ length: firstDayOffset }).map((_, i) => (
                      <div key={`empty-${i}`} className="min-h-[48px] sm:min-h-[80px] opacity-0" />
                    ))}

                    {/* Days 1 to 31 */}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const dateIso = `2025-12-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
                      const post = POSTS.find((p) => p.d === dateIso);
                      const isFilteredMatch = post ? filteredPosts.some((p) => p.id === post.id) : false;

                      if (post) {
                        const style = CATEGORY_STYLES[post.cat];
                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handleSelectCalendarDay(post.id)}
                            className={`min-h-[48px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-lg text-left border-l-2 transition-colors flex flex-col justify-between group ${
                              style.borderLeft
                            } ${style.bgSoft} border border-dark-borderSubtle hover:border-dark-border ${
                              !isFilteredMatch ? "opacity-30" : "opacity-100"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-medium text-warm-white tabular-nums">
                                {dayNum}
                              </span>
                              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            </div>

                            <p className="hidden sm:block text-[11px] text-warm-gray line-clamp-2 leading-snug group-hover:text-warm-white">
                              {post.cap.replace(/[“”]/g, "")}
                            </p>

                            <span className="hidden sm:block font-mono text-[9px] text-warm-muted truncate">
                              {post.cat}
                            </span>
                          </button>
                        );
                      }

                      return (
                        <div
                          key={dayNum}
                          className="min-h-[48px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-lg border border-dark-borderSubtle/40 bg-dark-surface2/30 text-warm-muted/60 text-xs font-mono flex flex-col justify-start tabular-nums"
                        >
                          <span>{dayNum}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 mt-5 pt-3 border-t border-dark-borderSubtle text-xs font-mono text-warm-muted">
                    <span className="text-warm-white">Pillars:</span>
                    {CATEGORIES.map((cat) => (
                      <div key={cat} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${CATEGORY_STYLES[cat].dot}`} />
                        <span>{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Helper */}
        <div className="p-4 px-6 border-t border-dark-borderSubtle bg-dark-bg/40 text-xs font-mono text-warm-muted flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>
            Select &ldquo;Plot and visual breakdown&rdquo; on any post to inspect the creative camera direction, visual hooks, and copywriting rationale.
          </span>
          <span className="text-warm-white">Compatible with Meta Business Suite &amp; Buffer</span>
        </div>
      </div>
    </div>
  );
}
