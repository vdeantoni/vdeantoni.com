"use client";

import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { motion, useAnimation } from "framer-motion";
import React, { FC } from "react";
import useColorScheme from "../hooks/useColorScheme";

const ColorSchemeToggle = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const [colorScheme, setColorScheme] = useColorScheme();

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
        setColorScheme(colorScheme === "default" ? "dark" : "default");
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });
      }}
      className={cn("a", "text-text", "overflow:hidden", className)}
    >
      <motion.div animate={controls}>
        <FontAwesomeIcon
          icon={colorScheme === "default" ? faSun : faMoon}
          className={cn("w-5", "h-5")}
        />
      </motion.div>
    </button>
  );
};

export default ColorSchemeToggle;
