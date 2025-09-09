import Image from "next/image";
import cn from "classnames";

const Me = () => {
  return (
    <div
      className={cn(
        "relative",
        "w-full",
        "min-h-[480px]",
        "md:h-auto",
        "rounded-lg",
        "overflow-hidden",
        "md:order-1",
        "shadow-lg",
      )}
    >
      <Image
        src={"/me.jpg"}
        alt={"Picture of the author"}
        fill={true}
        priority={true}
        style={{
          objectFit: "cover",
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
    </div>
  );
};

export default Me;
