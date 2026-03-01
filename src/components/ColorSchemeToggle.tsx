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
    return <div className={cn("w-5", "h-5", className)} />;
  }

  return (
    <button
      title="Toggle color mode"
      onClick={async (e) => {
        controls.stop();
        e.currentTarget.blur();
        await controls.start({
          y: -20,
          opacity: 0,
          transition: { duration: 0.3 },
          transitionEnd: { y: 10 },
        });
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });
      }}
      className={cn(
        "a",
        "text-text",
        "hover:text-primary",
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
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
