"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type PlacementVideo = {
  id: string;
  title: string;
  batch: string;
};

type YouTubePlayer = {
  destroy: () => void;
  getPlayerState: () => number;
  pauseVideo: () => void;
};

type YouTubePlayerConstructor = new (
  element: HTMLIFrameElement,
  options: {
    events?: {
      onStateChange?: (event: { data: number }) => void;
    };
  },
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: {
      Player: YouTubePlayerConstructor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const placementVideos: PlacementVideo[] = [
  {
    id: "YvzuWIMhzXU",
    title: "Student Placement Experience",
    batch: "PGDM Placement Batch 2023 - 2025",
  },
  {
    id: "4_0P8WzR1XQ",
    title: "Student Placement Journey",
    batch: "PGDM Placement Batch 2023 - 2025",
  },
  {
    id: "2QJHftGnUuw",
    title: "Placement Success Story",
    batch: "PGDM Placement Batch 2023 - 2025",
  },
  {
    id: "JX07Iia1kog",
    title: "Student Placement Experience",
    batch: "PGDM Placement Batch 2023 - 2025",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const SLIDE_DURATION = 450;

const YOUTUBE_PLAYING = 1;
const YOUTUBE_PAUSED = 2;
const YOUTUBE_ENDED = 0;

export default function PlacementVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playerRefs = useRef<Record<number, YouTubePlayer | null>>({});
  const iframeRefs = useRef<Record<number, HTMLIFrameElement | null>>({});
  const slideTimeoutRef = useRef<number | null>(null);

  const totalVideos = placementVideos.length;

  /*
   * Immediately stop the carousel when the user
   * interacts with the YouTube video.
   *
   * This prevents the 3-second slider from changing
   * before YouTube sends the PLAYING event.
   */
  const handleVideoInteraction = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  /*
   * Load YouTube IFrame API.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.YT?.Player) {
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");

    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  /*
   * Initialize YouTube players.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let cancelled = false;

    const initializePlayers = () => {
      if (cancelled) {
        return;
      }

      const YouTube = window.YT;

      if (!YouTube?.Player) {
        return;
      }

      placementVideos.forEach((_, index) => {
        const iframe = iframeRefs.current[index];

        if (!iframe || playerRefs.current[index]) {
          return;
        }

        playerRefs.current[index] = new YouTube.Player(iframe, {
          events: {
            onStateChange: (event) => {
              if (index !== activeIndex) {
                return;
              }

              if (event.data === YOUTUBE_PLAYING) {
                setIsVideoPlaying(true);
                return;
              }

              if (
                event.data === YOUTUBE_PAUSED ||
                event.data === YOUTUBE_ENDED
              ) {
                setIsVideoPlaying(false);
              }
            },
          },
        });
      });
    };

    if (window.YT?.Player) {
      initializePlayers();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        initializePlayers();
      };
    }

    const fallbackTimer = window.setInterval(() => {
      if (window.YT?.Player) {
        initializePlayers();
        window.clearInterval(fallbackTimer);
      }
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(fallbackTimer);
    };
  }, [activeIndex]);

  /*
   * Cleanup.
   */
  useEffect(() => {
    return () => {
      if (slideTimeoutRef.current !== null) {
        window.clearTimeout(slideTimeoutRef.current);
      }

      Object.values(playerRefs.current).forEach((player) => {
        try {
          player?.destroy();
        } catch {
          // Ignore third-party cleanup errors.
        }
      });

      playerRefs.current = {};
    };
  }, []);

  /*
   * Change video.
   */
  const changeVideo = useCallback(
    (nextIndex: number, nextDirection: "next" | "previous") => {
      if (
        isTransitioning ||
        totalVideos <= 1 ||
        nextIndex === activeIndex
      ) {
        return;
      }

      if (slideTimeoutRef.current !== null) {
        window.clearTimeout(slideTimeoutRef.current);
      }

      /*
       * Stop the current video before changing slide.
       */
      try {
        playerRefs.current[activeIndex]?.pauseVideo();
      } catch {
        // Ignore third-party player errors.
      }

      setIsVideoPlaying(false);
      setDirection(nextDirection);
      setIsTransitioning(true);

      slideTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
        slideTimeoutRef.current = null;
      }, SLIDE_DURATION);
    },
    [activeIndex, isTransitioning, totalVideos],
  );

  /*
   * Next video.
   */
  const goToNext = useCallback(() => {
    const nextIndex =
      activeIndex === totalVideos - 1 ? 0 : activeIndex + 1;

    changeVideo(nextIndex, "next");
  }, [activeIndex, totalVideos, changeVideo]);

  /*
   * Previous video.
   */
  const goToPrevious = useCallback(() => {
    const previousIndex =
      activeIndex === 0 ? totalVideos - 1 : activeIndex - 1;

    changeVideo(previousIndex, "previous");
  }, [activeIndex, totalVideos, changeVideo]);

  /*
   * Automatic slider.
   *
   * IMPORTANT:
   * No timer is created while the user is
   * interacting with / playing the video.
   */
  useEffect(() => {
    if (totalVideos <= 1 || isVideoPlaying || isTransitioning) {
      return;
    }

    const timer = window.setInterval(() => {
      goToNext();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    goToNext,
    totalVideos,
    isVideoPlaying,
    isTransitioning,
  ]);

  /*
   * Reset state after changing video.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVideoPlaying(false);
  }, [activeIndex]);

  if (totalVideos === 0) {
    return null;
  }

  const activeVideo = placementVideos[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          {/* Left Content */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
              Placement Stories
            </p>

            <h2 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#123b79] sm:text-5xl">
              PGDM Placement-Batch{" "}
              <span className="text-[#c31e3b]">(2023 - 2025)</span>
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-slate-600 sm:text-base">
              Hear directly from our students about their placement journey,
              learning experience and transition from campus to the corporate
              world.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Explore real student experiences and placement success stories
              from the PGDM 2023 - 2025 batch.
            </p>

            {/* Controls */}
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={isTransitioning}
                aria-label="Previous placement video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={isTransitioning}
                aria-label="Next placement video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>

              <div className="ml-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="text-[#c31e3b]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span>/</span>

                <span>
                  {String(totalVideos).padStart(2, "0")}
                </span>
              </div>

              {isVideoPlaying && (
                <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c31e3b]">
                  Playing
                </span>
              )}
            </div>
          </div>

          {/* Video */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_15px_45px_rgba(18,59,121,0.08)] sm:p-3">
              {/* Fixed viewport */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-[#071a35]">
                {placementVideos.map((video, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={video.id}
                      className={`absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "translate-x-0"
                          : direction === "next"
                            ? "-translate-x-full"
                            : "translate-x-full"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <iframe
                        ref={(element) => {
                          iframeRefs.current[index] = element;
                        }}
                        src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1`}
                        title={video.title}
                        className="h-full w-full"
                        loading={index === 0 ? "eager" : "lazy"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        onMouseDown={handleVideoInteraction}
                        onTouchStart={handleVideoInteraction}
                        onFocus={handleVideoInteraction}
                      />
                    </div>
                  );
                })}

                {/* Video Label */}
                <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  <Play
                    size={11}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  Student Placement Story
                </div>
              </div>

              {/* Current Video Information */}
              <div className="px-2 pb-1 pt-4 sm:px-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c31e3b]">
                  {activeVideo.batch}
                </p>

                <h3 className="mt-1.5 text-lg font-bold text-[#123b79] sm:text-xl">
                  {activeVideo.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}