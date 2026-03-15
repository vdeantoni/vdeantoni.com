"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import FaceTracker from "./FaceTracker";

const Me = () => {
  // Scale factors: container_width / 512 (original calibration width)
  // Mobile: 288/512 = 0.5625, Tablet: 320/512 = 0.625, Desktop: 400/512 = 0.78125
  return (
    <div className="relative">
      {/* Decorative ring */}
      <div
        className={cn(
          "absolute -inset-3 rounded-3xl",
          "border border-border/50",
          "pointer-events-none",
        )}
      />
      {/* Responsive outer container */}
      <div
        className={cn(
          "relative overflow-hidden",
          "w-72 h-[270px] md:w-80 md:h-[300px] lg:w-[400px] lg:h-[375px]",
          "rounded-2xl",
          "shadow-2xl shadow-black/10",
        )}
      >
        {/* Inner container at 512x480 (original calibration), scaled to fit */}
        <div
          className={cn(
            "absolute top-0 left-0 origin-top-left",
            "w-[512px] h-[480px]",
            "scale-[0.5625] md:scale-[0.625] lg:scale-[0.78125]",
          )}
        >
          <Image
            src="/me.jpg"
            alt="Vinicius De Antoni"
            fill
            priority
            sizes="512px"
            style={{ objectFit: "cover" }}
          />
          <FaceTracker faceSize={512} />
        </div>
      </div>
    </div>
  );
};

export default Me;
