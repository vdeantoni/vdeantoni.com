import React from "react";
import { formatTimeDifference } from "../utils/date";

const TimeDifference = ({ periods, className }) => {
  if (!periods || periods.length < 1) {
    return null;
  }

  return (
    <div className={className}>
      {formatTimeDifference(periods[periods.length - 1].start, periods[0].end)}
    </div>
  );
};

export default TimeDifference;
