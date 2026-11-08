"use client";

import { cn } from "@/lib/utils";
import { navLinks, type NavLink } from "@/lib/nav";
import { MotionConfig, motion } from "framer-motion";
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
        "relative isolate px-4 py-1.5 rounded-full text-sm font-medium",
        "transition-colors duration-300",
        isActive
          ? "text-background"
          : "text-text hover:text-heading hover:bg-surface",
      )}
    >
      {/* One pill shared by every link: the layoutId slides it from the old
          active link to the new one when the route changes */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 -z-10 rounded-full bg-foreground"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
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
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
};

export default NavLinks;
