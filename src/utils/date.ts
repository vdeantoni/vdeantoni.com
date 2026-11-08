import { differenceInMonths } from "date-fns";
import { plural } from "./string";

export const formatTimeDifference = (start: string, end: string): string => {
  let result = "";

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const diff = differenceInMonths(endDate, startDate);

  const years = Math.floor(diff / 12);
  const months = years ? diff - years * 12 : diff;

  if (years) {
    result += `${years} ${plural(years, ["yrs", "yr", "yrs"])} `;
  }

  if (months) {
    result += `${months} ${plural(months, ["mos", "mo", "mos"])} `;
  }

  return result;
};

export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  options = options || {
    year: "numeric",
    month: "short",
  };

  // Stored dates are calendar days at midnight, UTC for posts and Pacific for
  // the resume. Both fall on that day in UTC, but not in a US time zone.
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(date ? new Date(date) : new Date());
};
