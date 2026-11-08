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

// Black particles and lines add nothing under additive blending, so only the
// white triangles show
const DARK: Partial<Settings> = {
  background: false,
  backgroundInner: "#101010",
  density: 0.8,
  maxSpeed: 0.4,
  minRadius: 0,
  particleColor: "#000000",
  linkDistance: 160,
  lineWidth: 0,
  lineColor: "#000000",
  triangles: true,
  triangleColor: "#ffffff",
  triangleOpacity: 0.29,
  triangleTransition: 750,
  pointerLinks: false,
  pointerForce: "repel",
};

// Additive blending can only lighten, so the dark triangles need normal
// blending; the white particles and lines then show only where they cross them
const LIGHT: Partial<Settings> = {
  ...DARK,
  additive: false,
  particleColor: "#ffffff",
  lineColor: "#ffffff",
  triangleColor: "#000000",
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
