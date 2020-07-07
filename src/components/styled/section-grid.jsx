import * as $ from "classnames";
import React from "react";

const SectionGrid = ({ children }) => {
  return (
    <div
      className={$(
        "grid",
        "grid-cols-1",
        "lg:grid-cols-2-left-fixed-350",
        "lg:grid-cols-2-left-fixed-400",
        "gap-10",
        "md:gap-20",
        "mt-10",
        "items-start"
      )}
    >
      {children}
    </div>
  );
};

export default SectionGrid;
