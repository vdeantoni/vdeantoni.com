import { plural } from "./strings";

export const formatTimeDifference = (start, end) => {
  let result = "";

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffMonths = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);

  const years = Math.floor(diffMonths / 12);
  if (years) {
    result += `${years} ${plural(years, ["yrs", "yr", "yrs"])} `;
  }

  const months = years ? Math.floor(diffMonths % years) : diffMonths;
  if (months) {
    result += `${months} ${plural(months, ["mos", "mo", "mos"])} `;
  }

  return result;
};

export const formatDate = (date, options) => {
  options = options || {
    year: "numeric",
    month: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date ? new Date(date) : new Date());
};
