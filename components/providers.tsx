"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" turns off transform animations for people who ask the OS for less motion
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { fontFamily: "var(--font-body)", borderRadius: "14px" },
        }}
      />
    </MotionConfig>
  );
}
