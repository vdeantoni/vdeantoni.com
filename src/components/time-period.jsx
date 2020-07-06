import React from "react";
import { formatDate } from "../utils/date";
import { Box } from "theme-ui";

const TimePeriod = ({ start, end, ...props }) => {
  return (
    <Box {...props}>
      {formatDate(start) + ` – ` + (end ? formatDate(end) : "Present")}
    </Box>
  );
};

export default TimePeriod;
