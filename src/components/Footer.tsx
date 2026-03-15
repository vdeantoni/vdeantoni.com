import { cn } from "@/lib/utils";
import React, { FC } from "react";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { navLinks } from "@/lib/nav";

const Footer: FC = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-heading tracking-tight">
              Let&apos;s connect
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Always open to interesting conversations, collaborations, and new
              opportunities.
            </p>
            <SocialLinks className="mt-8" />
          </div>
          <nav className="flex flex-col md:items-end gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm text-muted-foreground hover:text-heading transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className={cn(
            "flex flex-col md:flex-row justify-between items-start md:items-center",
            "mt-16 pt-6 border-t border-border/50",
            "text-xs text-muted-foreground",
          )}
        >
          <span>
            This site is{" "}
            <a
              href="https://github.com/vdeantoni/vdeantoni.com"
              className="hover:text-primary transition-colors"
            >
              open source
            </a>
          </span>
          <span className="mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} Vinicius De Antoni
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
