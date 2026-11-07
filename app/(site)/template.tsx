"use client";

import { motion } from "motion/react";

// Soft fade between marketing pages. Opacity only, so it never fights layout or scroll position.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
