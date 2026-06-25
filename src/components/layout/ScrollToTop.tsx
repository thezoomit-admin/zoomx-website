"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type ScrollToTopProps = {
  /** Distance scrolled in pixels before the button appears. */
  threshold?: number;
};

export function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setVisible(y > threshold);
      setProgress(Math.min(1, Math.max(0, y / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  const handleClick = useCallback(() => {
    if (scrolling) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    setScrolling(true);
    const duration = 2000;
    const start = window.scrollY;
    const startTime = performance.now();

    const docEl = document.documentElement;
    const originalScrollBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = "auto";

    let animationFrameId: number;

    const easeInOutQuart = (t: number): number =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const cleanup = () => {
      docEl.style.scrollBehavior = originalScrollBehavior;
      setScrolling(false);
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
      window.removeEventListener("mousedown", handleUserInterrupt);
    };

    const handleUserInterrupt = () => {
      cancelAnimationFrame(animationFrameId);
      cleanup();
    };

    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchmove", handleUserInterrupt, { passive: true });
    window.addEventListener("mousedown", handleUserInterrupt, { passive: true });

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - easeInOutQuart(t)));
      if (t < 1) {
        animationFrameId = requestAnimationFrame(animateScroll);
      } else {
        cleanup();
      }
    };

    animationFrameId = requestAnimationFrame(animateScroll);
  }, [scrolling]);

  const fillHeight = `${Math.round(progress * 100)}%`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed right-4 z-[9998] lg:right-6"
      style={{
        top: 64,
        width: 42,
        height: 52,
        borderRadius: 4,
        background: "rgba(12, 5, 22, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(180, 100, 255, 0.45)",
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(100vh) scale(0.75)",
        transition:
          "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        boxShadow:
          "0 0 18px rgba(160,80,255,0.55), 0 4px 24px rgba(100,40,200,0.5), inset 0 1px 0 rgba(255,200,255,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* Fill bar — grows from bottom based on scroll progress */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: fillHeight,
          background:
            "linear-gradient(to top, rgba(160,60,255,1) 0%, rgba(200,100,255,0.85) 60%, rgba(230,160,255,0.5) 100%)",
          transition: "height 0.15s ease",
          borderRadius: "0 0 3px 3px",
          boxShadow: "0 -4px 20px rgba(180,80,255,0.6)",
        }}
      />

      {/* Percentage label */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 7,
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "rgba(230,190,255,0.95)",
          fontFamily: "var(--font-syne-next, sans-serif)",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {Math.round(progress * 100)}%
      </span>

      {/* Top divider */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 32,
          left: 8,
          right: 8,
          height: 1,
          background: "rgba(168,136,200,0.15)",
          borderRadius: 1,
          zIndex: 1,
        }}
      />

      {/* Arrow icon */}
      <span
        style={{
          position: "absolute",
          top: 11,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowUp
          style={{
            width: 15,
            height: 15,
            color: scrolling ? "rgba(255,255,255,0.6)" : "rgba(245,210,255,1)",
            strokeWidth: 2.5,
            filter: "drop-shadow(0 0 8px rgba(200,100,255,1))",
            transition: "color 0.3s",
          }}
        />
      </span>
    </button>
  );
}
