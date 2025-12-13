"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLink {
  name: string;
  link: string;
}

const navLinks: NavLink[] = [
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

const ActiveNavLink = ({
  link,
  currentPathname,
  footer = false,
}: {
  link: NavLink;
  currentPathname: string;
  footer?: boolean;
}) => {
  const isActive =
    link.link === "/"
      ? currentPathname === link.link
      : currentPathname.startsWith(link.link);

  return (
    <Link
      href={link.link}
      title={link.name}
      className={cn(
        "text-text",
        "text-base",
        "md:border-b-0",
        { "cursor-default": isActive },
        { "font-bold": isActive },
        { "py-3": !footer },
        { "border-b": !footer },
        {
          "relative group overflow-hidden": !footer && !isActive,
        },
      )}
    >
      {link.name}
      {!footer && (
        <span
          className={cn(
            "absolute",
            "left-1/2",
            "w-0",
            "h-[2px]",
            "bg-current",
            "transition-all",
            "duration-300",
            "ease-in-out",
            "group-hover:w-full",
            "-translate-x-1/2",
            "translate-y-4",
          )}
        />
      )}
    </Link>
  );
};

const NavLinks = ({
  footer = false,
  className,
}: {
  footer?: boolean;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "md:flex-row",
        "gap-0",
        "md:gap-2",
        "lg:gap-8",
        className,
      )}
    >
      {navLinks.map((link) => (
        <ActiveNavLink
          key={link.name}
          link={link}
          currentPathname={pathname}
          footer={footer}
        />
      ))}
    </div>
  );
};

export default NavLinks;
