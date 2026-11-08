"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { SlidersHorizontal } from "lucide-react";
import type { ParticleNetwork, Settings } from "@vdeantoni/particle-network";
import {
  ParticleNetworkCanvas,
  ParticleNetworkPanel,
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

const PANEL_ID = "hero-animation-settings";

const HeroBackground = () => {
  const { resolvedTheme } = useTheme();
  const [network, setNetwork] = useState<ParticleNetwork | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <ParticleNetworkCanvas
        ref={setNetwork}
        pointerTarget="window"
        settings={resolvedTheme === "light" ? LIGHT : DARK}
        className="absolute inset-0 -z-10 size-full"
      />
      <button
        type="button"
        title="Animation settings"
        aria-expanded={panelOpen}
        aria-controls={PANEL_ID}
        onClick={() => setPanelOpen((open) => !open)}
        className={cn(
          "absolute bottom-8 right-6 md:right-12",
          "flex items-center justify-center w-8 h-8 rounded-full",
          "text-muted-foreground hover:text-heading hover:bg-surface",
          "transition-colors duration-200",
          panelOpen && "text-heading bg-surface",
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>
      {network && panelOpen && (
        <div
          id={PANEL_ID}
          className="absolute bottom-20 right-6 md:right-12 z-10 w-72 max-h-[60svh] overflow-y-auto"
        >
          <ParticleNetworkPanel network={network} />
        </div>
      )}
    </>
  );
};

export default HeroBackground;
