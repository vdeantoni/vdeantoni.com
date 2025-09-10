"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cn from "classnames";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className={cn("relative", "w-full", "h-[calc(150%)]")}
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover")}
          priority
        />
      </motion.div>
    </div>
  );
}
