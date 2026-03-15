"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {
  ssr: false,
});

export default function MobileNav() {
  return (
    <nav className="flex md:hidden items-center justify-between w-full">
      <span className="font-bold text-xl text-heading tracking-tight">VDA</span>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="nav-glass p-2.5 rounded-full shadow-lg shadow-black/[0.03]"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px] px-6">
          <SheetHeader>
            <SheetTitle className="font-bold text-2xl text-heading tracking-tight">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavLinks className={cn("mt-4")} mobile />
            <div
              className={cn(
                "flex justify-between items-center py-4 mt-auto",
              )}
            >
              <SocialLinks />
              <ColorSchemeToggle className="ml-auto" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
