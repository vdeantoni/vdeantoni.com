"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { SlidersHorizontal } from "lucide-react";
import type { ParticleNetwork, Settings } from "@vdeantoni/particle-network";
import {
  ParticleNetworkCanvas,
  ParticleNetworkSettings,
} from "@vdeantoni/particle-network/react";
import { cn } from "@/lib/utils";

// Colors are --primary and --foreground in hex: the animation's settings and
// its panel's color pickers don't take oklch()
const DARK: Partial<Settings> = {
  background: false,
  density: 0.8,
  particleColor: "#157aff",
  lineColor: "#f8f8f8",
  triangles: true,
  triangleColor: "#157aff",
  triangleOpacity: 0.15,
};

// Additive blending pushes colors toward white, which vanishes on a light page
const LIGHT: Partial<Settings> = {
  ...DARK,
  additive: false,
  particleColor: "#0062fa",
  lineColor: "#555555",
  triangleColor: "#0062fa",
};

const HeroBackground = () => {
  const { resolvedTheme } = useTheme();
  const [network, setNetwork] = useState<ParticleNetwork | null>(null);

  return (
    <>
      {/* Fixed to the viewport behind the whole page. lvh rather than 100%,
          so a phone's toolbar showing and hiding doesn't resize the canvas. */}
      <ParticleNetworkCanvas
        ref={setNetwork}
        pointerTarget="window"
        settings={resolvedTheme === "light" ? LIGHT : DARK}
        storageKey="vdeantoni-particle-network"
        className="fixed inset-x-0 top-0 -z-10 h-lvh w-full"
      />
      <ParticleNetworkSettings
        network={network}
        className="absolute bottom-8 right-6 md:right-12 z-10"
        buttonClassName={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          "text-muted-foreground hover:text-heading hover:bg-surface",
          "aria-expanded:text-heading aria-expanded:bg-surface",
          "transition-colors duration-200",
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
      </ParticleNetworkSettings>
    </>
  );
};

export default HeroBackground;
