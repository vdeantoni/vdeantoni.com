import React from "react";
import { Box } from "theme-ui";

const Location = ({ location, ...props }) => {
  return <Box {...props}>{location}</Box>;
};

export default Location;
