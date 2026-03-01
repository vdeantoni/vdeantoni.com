"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import FaceTracker from "./FaceTracker";

const Me = () => {
  return (
    <div className={"md:order-1 overflow-hidden"}>
      <div
        className={cn(
          "relative",
          "w-[512px]",
          "h-[480px]",
          "rounded-xl",
          "overflow-hidden",
          "shadow-lg",
          "ring-1",
          "ring-primary/20",
        )}
      >
        {/* Background image */}
        <Image
          src={"/me.jpg"}
          alt={"Picture of the author"}
          fill={true}
          priority={true}
          sizes="512px"
          style={{
            objectFit: "cover",
          }}
        />

        {/* Face tracking overlay */}
        <FaceTracker faceSize={512} />
      </div>
    </div>
  );
};

export default Me;
