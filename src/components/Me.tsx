"use client";

import Image from "next/image";
import cn from "classnames";
import FaceTracker from "./FaceTracker";

const Me = () => {
  return (
    <div className={"md:order-1 overflow-hidden"}>
      <div
        className={cn(
          "relative",
          "w-[512px]",
          "h-[480px]",
          "rounded-lg",
          "overflow-hidden",
          "shadow-lg",
        )}
      >
        {/* Background image */}
        <Image
          src={"/me.jpg"}
          alt={"Picture of the author"}
          fill={true}
          priority={true}
          style={{
            objectFit: "cover",
          }}
        />

        {/* Face tracking overlay */}
        <FaceTracker />
      </div>
    </div>
  );
};

export default Me;
