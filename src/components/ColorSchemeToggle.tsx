"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

const ColorSchemeToggle = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return <div className={cn("w-8 h-8", className)} />;
  }

  return (
    <button
      title="Toggle color mode"
      onClick={async (e) => {
        controls.stop();
        e.currentTarget.blur();
        await controls.start({
          y: -16,
          opacity: 0,
          transition: { duration: 0.25 },
          transitionEnd: { y: 8 },
        });
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.4 },
        });
      }}
      className={cn(
        "flex items-center justify-center",
        "w-8 h-8 rounded-full",
        "text-muted-foreground hover:text-heading hover:bg-surface",
        "transition-colors duration-200",
        "overflow-hidden",
        className,
      )}
    >
      <motion.div
        animate={controls}
        whileHover={{
          rotate: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 },
        }}
      >
        {resolvedTheme === "light" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
