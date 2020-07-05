import React from "react";
import { formatTimeDifference } from "../utils/date";
import { Div } from "@reflexjs/components";

const TimeDifference = ({ periods, ...props }) => {
  if (!periods || periods.length < 1) {
    return null;
  }

  return (
    <Div {...props}>
      {formatTimeDifference(periods[periods.length - 1].start, periods[0].end)}
    </Div>
  );
};

export default TimeDifference;
