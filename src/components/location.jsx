import React from "react";
import { Div } from "@reflexjs/components";

const Location = ({ location, ...props }) => {
  return <Div {...props}>{location}</Div>;
};

export default Location;
