"use client";

import { cn } from "@/lib/utils";
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
  mobile = false,
}: {
  link: NavLink;
  currentPathname: string;
  footer?: boolean;
  mobile?: boolean;
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
        // Desktop: centered underline animation
        {
          "relative group overflow-hidden": !footer && !isActive && !mobile,
        },
        // Mobile: simple hover color change
        {
          "hover:text-primary transition-colors": mobile && !isActive,
        },
      )}
    >
      {link.name}
      {/* Desktop underline animation - centered */}
      {!footer && !mobile && (
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
  mobile = false,
  className,
}: {
  footer?: boolean;
  mobile?: boolean;
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
          mobile={mobile}
        />
      ))}
    </div>
  );
};

export default NavLinks;
