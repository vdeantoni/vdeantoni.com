import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

const NavLinks: FC<{ footer?: boolean; className?: string }> = ({
  footer = false,
  className,
}) => {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Posts",
      link: "/posts",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Resume",
      link: "/resume",
    },
  ];

  const { asPath } = useRouter();

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "md:flex-row",
        "gap-0",
        "md:gap-2",
        "lg:gap-8",
        className
      )}
    >
      {navLinks?.map((link) => (
        <Link key={link.name} href={link.link}>
          <a
            title={link.name}
            className={cn(
              "text-text",
              "text-base",
              "md:border-b-0",
              { "font-bold": asPath === link.link },
              { "py-3": !footer },
              { "border-b": !footer }
            )}
          >
            {link.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
