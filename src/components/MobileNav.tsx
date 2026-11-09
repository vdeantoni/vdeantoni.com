"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import { ParticleSettingsButton } from "./ParticleBackground";
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
      <div
        data-particle-network-ignore
        className="fixed top-5 right-16 z-50 nav-glass p-1 rounded-full shadow-lg shadow-black/[0.03]"
      >
        {/* The panel hangs left from the button's right edge, 68px from the
            screen's, so its width is capped to keep it on narrow screens */}
        <ParticleSettingsButton
          placement="below"
          className="[&>div>div[id]]:max-w-[calc(100vw-5.25rem)]"
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="fixed top-5 right-4 z-50 nav-glass p-2.5 rounded-full shadow-lg shadow-black/[0.03]"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          data-particle-network-ignore
          side="right"
          className="w-[300px] sm:w-[350px] px-6"
        >
          <SheetHeader>
            <SheetTitle className="font-bold text-2xl text-heading tracking-tight">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavLinks className={cn("mt-4")} mobile />
            <div
              className={cn("flex justify-between items-center py-4 mt-auto")}
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
