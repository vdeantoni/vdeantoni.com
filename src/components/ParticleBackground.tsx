"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { SlidersHorizontal } from "lucide-react";
import {
  BUILT_IN_PRESETS,
  type ParticleNetwork,
  type Settings,
} from "@vdeantoni/particle-network";
import {
  ParticleNetworkCanvas,
  ParticleNetworkSettings,
} from "@vdeantoni/particle-network/react";
import { cn } from "@/lib/utils";

// Zero-size particles and lines still move and link, so only the triangles
// are drawn
const DARK: Partial<Settings> = {
  background: false,
  backgroundInner: "#101010",
  density: 0.8,
  // Without it, the default of 1 is pulled down to maxSpeed and every
  // particle drifts at the same speed
  minSpeed: 0.13,
  maxSpeed: 0.4,
  minRadius: 0,
  maxRadius: 0,
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

// Additive blending can only lighten, so the dark triangles need normal blending
const LIGHT: Partial<Settings> = {
  ...DARK,
  additive: false,
  triangleColor: "#000000",
};

// Panel presets apply over the library's defaults, which paint an opaque
// gradient, so each turns it off to let the page's background show through
const DARK_PRESETS: Record<string, Partial<Settings>> = {
  Classic: { ...BUILT_IN_PRESETS.Classic, background: false },
  Constellation: { ...BUILT_IN_PRESETS.Constellation, background: false },
  Web: { ...BUILT_IN_PRESETS.Web, background: false },
  Paint: { ...BUILT_IN_PRESETS.Paint, background: false },
};

const LIGHT_PRESETS: Record<string, Partial<Settings>> = {
  Classic: {
    ...DARK_PRESETS.Classic,
    additive: false,
    particleColor: "#000000",
    lineColor: "#000000",
  },
  Constellation: {
    ...DARK_PRESETS.Constellation,
    additive: false,
    particleColor: "#1f2450",
    lineColor: "#4a5ba8",
  },
  Web: {
    ...DARK_PRESETS.Web,
    additive: false,
    particleColor: "#0086b3",
    lineColor: "#0086b3",
  },
  Paint: {
    ...DARK_PRESETS.Paint,
    additive: false,
    particleColor: "#d91a8f",
    lineColor: "#e67700",
  },
};

const NetworkContext = createContext<{
  network: ParticleNetwork | null;
  scheme: "dark" | "light";
}>({ network: null, scheme: "dark" });

const ParticleBackground = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [network, setNetwork] = useState<ParticleNetwork | null>(null);
  const scheme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <NetworkContext value={{ network, scheme }}>
      {/* Fixed to the viewport behind every page. lvh rather than 100%, so a
          phone's toolbar showing and hiding doesn't resize the canvas. */}
      <ParticleNetworkCanvas
        ref={setNetwork}
        pointerTarget="window"
        settings={scheme === "light" ? LIGHT : DARK}
        storageKey={`vdeantoni-particle-network-${scheme}`}
        className="fixed inset-x-0 top-0 -z-10 h-lvh w-full"
      />
      {children}
    </NetworkContext>
  );
};

export const ParticleSettingsButton = ({
  placement,
  className,
}: {
  placement: "above" | "below";
  className?: string;
}) => {
  const { network, scheme } = useContext(NetworkContext);

  return (
    <ParticleNetworkSettings
      network={network}
      presets={scheme === "light" ? LIGHT_PRESETS : DARK_PRESETS}
      shortcut={null}
      placement={placement}
      className={className}
      buttonClassName={cn(
        "flex items-center justify-center w-8 h-8 rounded-full cursor-pointer",
        "text-muted-foreground hover:text-heading hover:bg-surface",
        "aria-expanded:text-heading aria-expanded:bg-surface",
        "transition-colors duration-200",
      )}
    >
      <SlidersHorizontal className="w-4 h-4" />
    </ParticleNetworkSettings>
  );
};

export default ParticleBackground;
