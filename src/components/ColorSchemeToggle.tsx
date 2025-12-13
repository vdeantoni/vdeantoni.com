"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useColorScheme } from "../hooks/useColorScheme";

const ColorSchemeToggle = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const { scheme, setScheme } = useColorScheme();

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
        setScheme(scheme === "default" ? "dark" : "default");
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });
      }}
      className={cn("a", "text-text", "hover:text-primary", "overflow-hidden", className)}
    >
      <motion.div
        animate={controls}
        whileHover={{
          rotate: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 }
        }}
      >
        {scheme === "default" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
