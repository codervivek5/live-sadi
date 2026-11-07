"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  delay = 0,
  y = 22,
  immediate = false,
  className,
  children,
  ...rest
}: { delay?: number; y?: number; immediate?: boolean } & HTMLMotionProps<"div">) {
  // `immediate` is for above-the-fold content: animate on load instead of waiting to scroll into view
  const trigger = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } };
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any <StaggerItem> inside it as it enters the viewport. */
export function Stagger({
  gap = 0.08,
  className,
  children,
  as = "div",
}: {
  gap?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "ul" | "ol";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  className,
  children,
  as = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "li";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
    >
      {children}
    </M>
  );
}

/** Counts from 0 to `to` once, when it becomes visible. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("en-IN"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.4, ease });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
