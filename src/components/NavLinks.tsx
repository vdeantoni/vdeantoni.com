"use client";

import { cn } from "@/lib/utils";
import { navLinks, type NavLink } from "@/lib/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveNavLink = ({
  link,
  currentPathname,
  mobile = false,
}: {
  link: NavLink;
  currentPathname: string;
  mobile?: boolean;
}) => {
  const isActive =
    link.link === "/"
      ? currentPathname === link.link
      : currentPathname.startsWith(link.link);

  if (mobile) {
    return (
      <Link
        href={link.link}
        title={link.name}
        className={cn(
          "text-lg py-3 border-b border-border/50",
          "transition-colors duration-200",
          isActive
            ? "text-primary font-medium"
            : "text-text hover:text-primary",
        )}
      >
        {link.name}
      </Link>
    );
  }

  return (
    <Link
      href={link.link}
      title={link.name}
      className={cn(
        "relative px-4 py-1.5 rounded-full text-sm font-medium",
        "transition-all duration-200",
        isActive
          ? "bg-foreground text-background"
          : "text-text hover:text-heading hover:bg-surface",
      )}
    >
      {link.name}
    </Link>
  );
};

const NavLinks = ({
  mobile = false,
  className,
}: {
  mobile?: boolean;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        mobile ? "flex flex-col gap-0" : "flex items-center gap-0.5",
        className,
      )}
    >
      {navLinks.map((link) => (
        <ActiveNavLink
          key={link.name}
          link={link}
          currentPathname={pathname}
          mobile={mobile}
        />
      ))}
    </div>
  );
};

export default NavLinks;
