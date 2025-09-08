import cn from "classnames";
import { addYears } from "date-fns";
import first from "lodash/first";
import groupBy from "lodash/groupBy";
import last from "lodash/last";
import range from "lodash/range";
import React, { FC } from "react";

const getStartIndex = (items: any[], years: number[]): number =>
  (new Date(last(items).start).getFullYear() - years[0]) * 12 +
  new Date(last(items).start).getMonth() +
  1;

const getSpanSize = (items: any[]): number => {
  const start = new Date(last(items).start);
  const end = first(items).end ? new Date(first(items).end) : new Date();

  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth()
  );
};

const TimelineItem = ({ name, slug, items, years, itemColor }: any) => {
  const borderColor =
    itemColor === "secondary"
      ? "border-secondary"
      : itemColor === "tertiary"
        ? "border-tertiary"
        : "border-primary";
  const borderColorHover =
    itemColor === "secondary"
      ? "group-hover:border-secondary-hover"
      : itemColor === "tertiary"
        ? "group-hover:border-tertiary-hover"
        : "group-hover:border-primary-hover";
  return (
    <a
      href={`#${slug}`}
      className={cn(
        "group",
        "flex",
        "justify-center",
        "overflow-hidden",
        "hover:overflow-visible",
      )}
      style={{
        gridColumn: `${getStartIndex(items, years)} / span ${getSpanSize(
          items,
        )}`,
      }}
    >
      <span
        className={cn(
          "text-text",
          "text-xs",
          "opacity-90",
          "group-hover:opacity-100",
          "p-1",
          borderColor,
          borderColorHover,
          "border-b-8",
          "whitespace-nowrap",
          "actionable",
        )}
        style={{ width: "calc(100% - 10px)" }}
      >
        {name}
      </span>
    </a>
  );
};

const Timeline = ({ data = [] }: { data: any[] }) => {
  const {
    company: companies,
    school: schools,
    certification: certifications,
  } = groupBy(data, "type");

  const years = range(2002, new Date().getFullYear());

  return (
    <div
      className={cn("grid")}
      style={{
        gridTemplateColumns: `repeat(${years.length * 12}, minmax(0, 1fr))`,
      }}
    >
      {companies.reverse().map((company) => (
        <TimelineItem
          key={company.name}
          name={company.name}
          slug={company.slug}
          items={company.items}
          years={years}
          itemColor="primary"
        />
      ))}

      <div className={cn("col-start-1", "col-span-full", "h-1")} />

      {schools.reverse().map((school) => (
        <TimelineItem
          key={school.name}
          name={school.degree}
          slug={school.slug}
          items={[school]}
          years={years}
          itemColor="secondary"
        />
      ))}

      <div className={cn("col-start-1", "col-span-full", "h-1")} />

      {certifications.reverse().map((certification) => (
        <TimelineItem
          key={certification.name}
          name={certification.technology}
          slug={certification.slug}
          items={[
            {
              start: certification.date,
              end: addYears(new Date(certification.date), 1),
            },
          ]}
          years={years}
          itemColor="tertiary"
        />
      ))}

      <div className={cn("col-start-1", "col-span-full", "h-3")} />

      {years.map((year, index) => (
        <div
          key={year}
          className={cn(
            "text-sm",
            "text-center",
            "pt-2",
            "border-t",
            "border-border",
          )}
          style={{
            gridColumn: `span 12 / span 12`,
          }}
        >
          <span className={cn("opacity-75")}>
            {index === years.length - 1
              ? "Present"
              : index % 5 === 0
                ? year
                : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
