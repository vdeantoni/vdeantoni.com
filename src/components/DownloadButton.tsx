"use client";

import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import React, { FC } from "react";

const DownloadButton: FC = () => {
  return (
    <a
      href="/resume.pdf"
      download="vdeantoni-resume.pdf"
      className={cn(
        "button",
        "inline-flex",
        "items-center",
        "gap-2",
        "no-print",
      )}
      title="Download Resume as PDF"
    >
      <FontAwesomeIcon icon={faDownload} className={cn("w-4", "h-4")} />
      <span>Download PDF</span>
    </a>
  );
};

export default DownloadButton;
