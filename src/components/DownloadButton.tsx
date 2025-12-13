"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";

const DownloadButton: FC = () => {
  return (
    <Button asChild className={cn("no-print")}>
      <a
        href="/resume.pdf"
        download="vdeantoni-resume.pdf"
        title="Download Resume as PDF"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </a>
    </Button>
  );
};

export default DownloadButton;
