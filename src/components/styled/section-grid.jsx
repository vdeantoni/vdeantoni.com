import * as $ from "classnames";
import React from "react";

const SectionGrid = ({ className = "", children }) => {
  return (
    <div
      className={$(
        "grid",
        "grid-cols-1",
        "lg:grid-cols-2-left-fixed-350",
        "lg:grid-cols-2-left-fixed-400",
        "gap-5",
        "lg:gap-10",
        "items-start",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionGrid;
