"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

const ColorSchemeToggle = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const { resolvedTheme, setTheme } = useTheme();

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
        {/* Both icons are always rendered and CSS picks one, so the markup is
            identical on the server and on the client. Branching on
            `resolvedTheme` here instead would hydrate-mismatch: it is
            undefined during SSR but already resolved on the first client
            render. */}
        <Sun className="w-4 h-4 dark:hidden" />
        <Moon className="hidden w-4 h-4 dark:block" />
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
