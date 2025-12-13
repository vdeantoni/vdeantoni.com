"use client";

import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
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
        <FontAwesomeIcon
          icon={scheme === "default" ? faSun : faMoon}
          className={cn("w-5", "h-5")}
        />
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
