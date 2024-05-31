"use client";
import Atropos from "atropos/react";
import Image from "next/image";
import cn from "classnames";

const Me = () => {
  return (
    <Atropos
      activeOffset={10}
      shadowScale={1.05}
      rotateXMax={5}
      rotateYMax={5}
      className={cn(
        "relative",
        "w-full",
        "min-h-[480px]",
        "md:h-auto",
        "md:order-1"
      )}
    >
      <div>
        <Image
          src={"/me.jpg"}
          alt={"Picture of the author playing guitar"}
          fill={true}
          priority={false}
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="animate-brighten rounded-lg"
        />
      </div>
    </Atropos>
  );
};

export default Me;
