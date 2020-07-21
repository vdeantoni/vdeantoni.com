import React from "react";
import { formatDate } from "../utils/date";

const TimePeriod = ({ start, end, className }) => {
  return <div className={className}>{formatDate(start) + ` – ` + (end ? formatDate(end) : "Present")}</div>;
};

export default TimePeriod;
