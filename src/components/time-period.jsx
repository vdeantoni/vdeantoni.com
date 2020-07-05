import React from "react";
import { formatDate } from "../utils/date";
import { Div } from "@reflexjs/components";

const TimePeriod = ({ start, end, ...props }) => {
  return (
    <Div {...props}>
      {formatDate(start) + ` – ` + (end ? formatDate(end) : "Present")}
    </Div>
  );
};

export default TimePeriod;
