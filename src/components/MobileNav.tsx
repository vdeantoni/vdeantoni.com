"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import { Branding } from "./Header";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {
  ssr: false,
});

export default function MobileNav() {
  return (
    <nav
      className={cn(
        "mobile",
        "flex",
        "md:hidden",
        "justify-between",
        "items-center",
        "w-full",
      )}
    >
      <Branding />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px] px-6">
          <SheetHeader>
            <SheetTitle>
              <Avatar
                className={cn(
                  "w-10",
                  "h-10",
                  "border",
                  "border-foreground",
                  "bg-background",
                )}
              >
                <AvatarImage
                  src="/logo.svg"
                  alt="vdeantoni.com"
                  className="dark:invert"
                />
                <AvatarFallback>VD</AvatarFallback>
              </Avatar>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavLinks className={cn("border-t", "mt-4")} mobile />
            <div
              className={cn(
                "flex",
                "justify-between",
                "items-center",
                "py-4",
                "mt-auto",
              )}
            >
              <SocialLinks />
              <ColorSchemeToggle className={cn("ml-auto")} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
