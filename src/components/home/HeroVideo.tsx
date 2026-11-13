"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoSource = {
  src: string;
  type: string;
};

type HeroVideoProps = {
  poster: string;
  sources: HeroVideoSource[];
  // Smaller renditions for narrow screens. When `mobileMediaQuery` matches at
  // the moment the sources are attached, these are listed first and the
  // regular `sources` follow as fallbacks; otherwise only `sources` are used.
  mobileSources?: HeroVideoSource[];
  mobileMediaQuery?: string;
};

// Longest wait for the window "load" event before the video sources are
// attached anyway (load can be held back by slow third-party resources).
const MAX_WAIT_FOR_LOAD_MS = 3000;
// requestIdleCallback timeout, and the delay used where it is unsupported.
const IDLE_TIMEOUT_MS = 2000;
const NO_IDLE_CALLBACK_DELAY_MS = 200;

/**
 * Poster-first hero video.
 *
 * The server HTML (and the first client render) contains the <video> with its
 * poster but no <source> children, so the browser paints the poster without
 * downloading any video data. Once the page has loaded (or after
 * MAX_WAIT_FOR_LOAD_MS) and the main thread is idle, the sources are attached
 * in their original order (WebM, MP4, original MOV). Inserting <source>
 * children into a media element with no src starts the browser's normal source
 * selection, so exactly one file is fetched, and the autoplay attribute starts
 * playback. The poster stays visible until the first video frame is ready.
 */
export default function HeroVideo({
  poster,
  sources,
  mobileSources,
  mobileMediaQuery,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null until the sources are attached (the server HTML has none). The
  // choice is made by viewport width (not user agent), once, when the
  // sources are attached.
  const [sourceSet, setSourceSet] = useState<"default" | "mobile" | null>(
    null,
  );
  const sourcesAttached = sourceSet !== null;
  const mediaQueryRef = useRef(mobileMediaQuery);

  // The full-size sources always stay in the list, after the mobile ones.
  const attachedSources =
    sourceSet === "mobile" && mobileSources?.length
      ? [...mobileSources, ...sources]
      : sourceSet === null
        ? null
        : sources;

  useEffect(() => {
    let started = false;
    let idleId: number | undefined;
    let delayTimer: number | undefined;

    const attach = () => {
      const query = mediaQueryRef.current;
      setSourceSet(
        query &&
          typeof window.matchMedia === "function" &&
          window.matchMedia(query).matches
          ? "mobile"
          : "default",
      );
    };

    const scheduleAttach = () => {
      if (started) return;
      started = true;
      window.removeEventListener("load", scheduleAttach);
      window.clearTimeout(loadFallbackTimer);

      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(attach, {
          timeout: IDLE_TIMEOUT_MS,
        });
      } else {
        delayTimer = window.setTimeout(attach, NO_IDLE_CALLBACK_DELAY_MS);
      }
    };

    const loadFallbackTimer = window.setTimeout(
      scheduleAttach,
      MAX_WAIT_FOR_LOAD_MS,
    );

    if (document.readyState === "complete") {
      scheduleAttach();
    } else {
      window.addEventListener("load", scheduleAttach);
    }

    return () => {
      window.removeEventListener("load", scheduleAttach);
      window.clearTimeout(loadFallbackTimer);
      window.clearTimeout(delayTimer);
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!sourcesAttached) return;

    const video = videoRef.current;
    if (!video) return;

    // Keep the video muted (required for autoplay) and ask for playback.
    // If the browser refuses autoplay, the poster simply stays visible.
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [sourcesAttached]);

  return (
    <video
      ref={videoRef}
      className="block h-auto w-full"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      // The first frame shows until playback starts, and width/height
      // reserve the 16:9 space so nothing below the hero shifts.
      poster={poster}
      width={1920}
      height={1080}
    >
      {attachedSources?.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
    </video>
  );
}
