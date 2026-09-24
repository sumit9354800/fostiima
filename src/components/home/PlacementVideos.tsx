"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type PlacementVideo = {
  id: string;
  title: string;
  batch: string;
  youtubeUrl: string;
};

type YouTubePlayer = {
  destroy: () => void;
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

const SLIDE_DURATION = 450;

const YOUTUBE_PLAYING = 1;
const YOUTUBE_PAUSED = 2;
const YOUTUBE_ENDED = 0;

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace("/", "");
    }

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {
      return parsed.searchParams.get("v");
    }

    const embedMatch = parsed.pathname.match(
      /\/embed\/([^/?]+)/,
    );

    if (embedMatch?.[1]) {
      return embedMatch[1];
    }

    const shortsMatch = parsed.pathname.match(
      /\/shorts\/([^/?]+)/,
    );

    if (shortsMatch?.[1]) {
      return shortsMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export default function PlacementVideos({
  videos = [],
}: {
  videos?: PlacementVideo[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] =
    useState<"next" | "previous">("next");
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [isVideoPlaying, setIsVideoPlaying] =
    useState(false);

  const isVideoPlayingRef = useRef(false);

  const playerRefs = useRef<
    Record<number, YouTubePlayer | null>
  >({});

  const iframeRefs = useRef<
    Record<number, HTMLIFrameElement | null>
  >({});

  const slideTimeoutRef = useRef<number | null>(null);

  /*
   * IMPORTANT:
   * videos can temporarily be undefined while
   * server/database data is loading.
   *
   * We already default it to [] above, so this
   * will always be a valid number.
   */
  const totalVideos = videos.length;

  const updateVideoPlayingState = useCallback(
    (playing: boolean) => {
      isVideoPlayingRef.current = playing;
      setIsVideoPlaying(playing);
    },
    [],
  );

  const handleVideoInteraction = useCallback(() => {
    isVideoPlayingRef.current = true;
    setIsVideoPlaying(true);
  }, []);

  /*
   * Load YouTube IFrame API
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

    script.src =
      "https://www.youtube.com/iframe_api";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  /*
   * Reset active index when database data changes.
   */
  useEffect(() => {
    if (totalVideos === 0) {
      if (activeIndex !== 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveIndex(0);
      }

      return;
    }

    if (activeIndex >= totalVideos) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(0);
    }
  }, [activeIndex, totalVideos]);

  /*
   * Initialize YouTube players
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (videos.length === 0) {
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

      videos.forEach((_, index) => {
        const iframe = iframeRefs.current[index];

        if (
          !iframe ||
          playerRefs.current[index]
        ) {
          return;
        }

        playerRefs.current[index] =
          new YouTube.Player(iframe, {
            events: {
              onStateChange: (event) => {
                if (index !== activeIndex) {
                  return;
                }

                if (
                  event.data === YOUTUBE_PLAYING
                ) {
                  updateVideoPlayingState(true);
                  return;
                }

                if (
                  event.data === YOUTUBE_PAUSED ||
                  event.data === YOUTUBE_ENDED
                ) {
                  updateVideoPlayingState(false);
                }
              },
            },
          });
      });
    };

    if (window.YT?.Player) {
      initializePlayers();
    } else {
      const previousCallback =
        window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        initializePlayers();
      };
    }

    const apiCheckTimer =
      window.setInterval(() => {
        if (window.YT?.Player) {
          initializePlayers();

          window.clearInterval(
            apiCheckTimer,
          );
        }
      }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(apiCheckTimer);
    };
  }, [
    activeIndex,
    videos,
    updateVideoPlayingState,
  ]);

  /*
   * Cleanup
   */
  useEffect(() => {
    return () => {
      if (
        slideTimeoutRef.current !== null
      ) {
        window.clearTimeout(
          slideTimeoutRef.current,
        );
      }

      Object.values(
        playerRefs.current,
      ).forEach((player) => {
        try {
          player?.destroy();
        } catch {
          // Ignore YouTube cleanup errors.
        }
      });

      playerRefs.current = {};
    };
  }, []);

  /*
   * Change video
   */
  const changeVideo = useCallback(
    (
      nextIndex: number,
      nextDirection:
        | "next"
        | "previous",
    ) => {
      if (
        isTransitioning ||
        totalVideos <= 1 ||
        nextIndex === activeIndex
      ) {
        return;
      }

      if (
        slideTimeoutRef.current !== null
      ) {
        window.clearTimeout(
          slideTimeoutRef.current,
        );
      }

      updateVideoPlayingState(false);

      try {
        playerRefs.current[
          activeIndex
        ]?.pauseVideo();
      } catch {
        // Ignore YouTube player errors.
      }

      setDirection(nextDirection);
      setIsTransitioning(true);

      slideTimeoutRef.current =
        window.setTimeout(() => {
          setActiveIndex(nextIndex);
          setIsTransitioning(false);
          slideTimeoutRef.current = null;
        }, SLIDE_DURATION);
    },
    [
      activeIndex,
      isTransitioning,
      totalVideos,
      updateVideoPlayingState,
    ],
  );

  /*
   * Next video
   */
  const goToNext = useCallback(() => {
    if (
      totalVideos <= 1 ||
      isVideoPlayingRef.current
    ) {
      return;
    }

    const nextIndex =
      activeIndex === totalVideos - 1
        ? 0
        : activeIndex + 1;

    changeVideo(nextIndex, "next");
  }, [
    activeIndex,
    totalVideos,
    changeVideo,
  ]);

  /*
   * Previous video
   */
  const goToPrevious = useCallback(() => {
    if (totalVideos <= 1) {
      return;
    }

    const previousIndex =
      activeIndex === 0
        ? totalVideos - 1
        : activeIndex - 1;

    changeVideo(
      previousIndex,
      "previous",
    );
  }, [
    activeIndex,
    totalVideos,
    changeVideo,
  ]);

  /*
   * No videos available
   */
  if (totalVideos === 0) {
    return null;
  }

  const safeActiveIndex =
    Math.min(
      activeIndex,
      totalVideos - 1,
    );

  const activeVideo =
    videos[safeActiveIndex];

  if (!activeVideo) {
    return null;
  }

  const activeVideoId =
    getYouTubeId(
      activeVideo.youtubeUrl,
    );

  if (!activeVideoId) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
              Placement Stories
            </p>

            <h2 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#123b79] sm:text-5xl">
              PGDM Placement-Batch{" "}
              <span className="text-[#c31e3b]">
                {activeVideo.batch}
              </span>
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-slate-600 sm:text-base">
              Hear directly from our students
              about their placement journey,
              learning experience and transition
              from campus to the corporate world.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Explore real student experiences
              and placement success stories.
            </p>

            {/* CONTROLS */}
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={
                  isTransitioning ||
                  totalVideos <= 1
                }
                aria-label="Previous placement video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
              >
                <ChevronLeft
                  size={20}
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={
                  isTransitioning ||
                  totalVideos <= 1
                }
                aria-label="Next placement video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
              >
                <ChevronRight
                  size={20}
                  aria-hidden="true"
                />
              </button>

              <div className="ml-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="text-[#c31e3b]">
                  {String(
                    safeActiveIndex + 1,
                  ).padStart(2, "0")}
                </span>

                <span>/</span>

                <span>
                  {String(
                    totalVideos,
                  ).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* VIDEO */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_15px_45px_rgba(18,59,121,0.08)] sm:p-3">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-[#071a35]">

                {videos.map(
                  (video, index) => {
                    const videoId =
                      getYouTubeId(
                        video.youtubeUrl,
                      );

                    if (!videoId) {
                      return null;
                    }

                    const isActive =
                      index === safeActiveIndex;

                    return (
                      <div
                        key={video.id}
                        className={`absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "translate-x-0"
                            : direction ===
                                "next"
                              ? "-translate-x-full"
                              : "translate-x-full"
                        }`}
                        aria-hidden={
                          !isActive
                        }
                      >
                        <iframe
                          ref={(element) => {
                            iframeRefs.current[
                              index
                            ] = element;
                          }}
                          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                          title={
                            video.title
                          }
                          className="h-full w-full"
                          loading={
                            index === 0
                              ? "eager"
                              : "lazy"
                          }
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          onMouseDown={
                            handleVideoInteraction
                          }
                          onTouchStart={
                            handleVideoInteraction
                          }
                          onFocus={
                            handleVideoInteraction
                          }
                        />
                      </div>
                    );
                  },
                )}

                {/* VIDEO LABEL */}
                <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  <Play
                    size={11}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  Student Placement Story
                </div>
              </div>

              {/* VIDEO INFORMATION */}
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
