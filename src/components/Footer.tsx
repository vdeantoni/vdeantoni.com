import { cn } from "@/lib/utils";
import React, { FC } from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import { Separator } from "@/components/ui/separator";

const Footer: FC = () => {
  return (
    <footer>
      <div
        className={cn(
          "flex",
          "flex-col",
          "md:flex-row",
          "items-start",
          "md:items-center",
          "justify-center",
        )}
      >
        <NavLinks
          footer={true}
          className={cn("gap-4", "my-6", "md:my-0", "md:hidden")}
        />
        <SocialLinks />
      </div>
      <Separator className={cn("mt-4", "md:mt-5", "md:mt-6")} />
      <div
        className={cn(
          "text-sm",
          "flex",
          "justify-between",
          "py-4",
          "md:py-5",
          "md:py-6",
        )}
      >
        <div className={cn("text-sm")}>
          This web site is{" "}
          <a href="https://github.com/vdeantoni/vdeantoni.com">open source.</a>
        </div>
        <div className={cn("text-sm", "self-end")}>
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
