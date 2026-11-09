"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { SlidersHorizontal } from "lucide-react";
import type { ParticleNetwork, Settings } from "@vdeantoni/particle-network";
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

const NetworkContext = createContext<ParticleNetwork | null>(null);

const ParticleBackground = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [network, setNetwork] = useState<ParticleNetwork | null>(null);
  const scheme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <NetworkContext value={network}>
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
}: {
  placement: "above" | "below";
}) => {
  const network = useContext(NetworkContext);

  return (
    <ParticleNetworkSettings
      network={network}
      placement={placement}
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
