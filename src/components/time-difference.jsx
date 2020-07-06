import React from "react";
import { formatTimeDifference } from "../utils/date";
import { Box } from "theme-ui";

const TimeDifference = ({ periods, ...props }) => {
  if (!periods || periods.length < 1) {
    return null;
  }

  return (
    <Box {...props}>
      {formatTimeDifference(periods[periods.length - 1].start, periods[0].end)}
    </Box>
  );
};

export default TimeDifference;
