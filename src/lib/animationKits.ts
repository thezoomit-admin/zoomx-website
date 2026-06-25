import type { Variants } from "framer-motion";

export type AnimationKit = {
  container: Variants;
  marker: Variants;
  text: Variants;
  visual: Variants;
};

const baseContainer = (stagger = 0.18): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
});

export const spinKit: AnimationKit = {
  container: baseContainer(0.18),
  marker: {
    hidden: { opacity: 0, scale: 0, rotate: -360 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 220, damping: 12, mass: 0.8 },
    },
  },
  text: {
    hidden: { opacity: 0, x: -80, skewX: -8, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      skewX: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 160, damping: 18, mass: 0.9 },
    },
  },
  visual: {
    hidden: { opacity: 0, scale: 0.4, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 140, damping: 16, mass: 1 },
    },
  },
};

export const dropSlideKit: AnimationKit = {
  container: baseContainer(0.16),
  marker: {
    hidden: { opacity: 0, y: -140 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 320, damping: 14, mass: 0.7 },
    },
  },
  text: {
    hidden: { opacity: 0, x: 100, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  visual: {
    hidden: { opacity: 0, x: 140, scale: 0.85 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 18, mass: 1 },
    },
  },
};

export const burstKit: AnimationKit = {
  container: baseContainer(0.18),
  marker: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: [0, 1.4, 0.9, 1],
      transition: { duration: 0.7, times: [0, 0.55, 0.8, 1], ease: [0.22, 1, 0.36, 1] },
    },
  },
  text: {
    hidden: { opacity: 0, scale: 1.35, filter: "blur(14px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  },
  visual: {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export const flipKit: AnimationKit = {
  container: baseContainer(0.22),
  marker: {
    hidden: { opacity: 0, rotateY: 180, scale: 0.7 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 16, mass: 0.9 },
    },
  },
  text: {
    hidden: { opacity: 0, rotateX: -90, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 170, damping: 18, mass: 0.95 },
    },
  },
  visual: {
    hidden: { opacity: 0, rotateY: -85, scale: 0.85 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 140, damping: 18, mass: 1.1 },
    },
  },
};

export const explosionKit: AnimationKit = {
  container: baseContainer(0.12),
  marker: {
    hidden: { opacity: 0, scale: 0, rotate: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 420, damping: 9, mass: 0.6 },
    },
  },
  text: {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 280, damping: 12, mass: 0.8 },
    },
  },
  visual: {
    hidden: { opacity: 0, scale: 0.5, y: 90, rotate: -6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 220, damping: 14, mass: 1 },
    },
  },
};

export const ANIMATION_KITS: AnimationKit[] = [
  spinKit,
  dropSlideKit,
  burstKit,
  flipKit,
  explosionKit,
];
