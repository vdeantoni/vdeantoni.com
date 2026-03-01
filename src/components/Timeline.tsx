import { cn } from "@/lib/utils";
import { addYears } from "date-fns";
import type {
  ResumeEntry,
  ResumeCompany,
  ResumeSchool,
  ResumeCertification,
} from "@/data";
import React from "react";

interface TimelinePeriod {
  start: string;
  end?: string | null;
}

const getStartIndex = (items: TimelinePeriod[], years: number[]): number =>
  (new Date(items.at(-1)!.start).getFullYear() - years[0]) * 12 +
  new Date(items.at(-1)!.start).getMonth() +
  1;

const getSpanSize = (items: TimelinePeriod[]): number => {
  const start = new Date(items.at(-1)!.start);
  const end = items.at(0)!.end ? new Date(items.at(0)!.end!) : new Date();

  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth()
  );
};

const TimelineEntry = ({
  name,
  slug,
  items,
  years,
  itemColor,
}: {
  name: string;
  slug: string;
  items: TimelinePeriod[];
  years: number[];
  itemColor: string;
}) => {
  const borderColor =
    itemColor === "secondary"
      ? "border-secondary"
      : itemColor === "tertiary"
        ? "border-tertiary"
        : itemColor === "fourtiary"
          ? "border-fourtiary"
          : "border-primary";
  const borderColorHover =
    itemColor === "secondary"
      ? "group-hover:border-secondary-hover"
      : itemColor === "tertiary"
        ? "group-hover:border-tertiary-hover"
        : itemColor === "fourtiary"
          ? "group-hover:border-fourtiary-hover"
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
        gridColumn: `${getStartIndex(items, years)} / span ${getSpanSize(items)}`,
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

const isCompany = (entry: ResumeEntry): entry is ResumeCompany =>
  entry.type === "company";
const isSchool = (entry: ResumeEntry): entry is ResumeSchool =>
  entry.type === "school";
const isCertification = (entry: ResumeEntry): entry is ResumeCertification =>
  entry.type === "certification";

const Timeline = ({ data = [] }: { data: ResumeEntry[] }) => {
  const companies = data.filter(isCompany);
  const schools = data.filter(isSchool);
  const certifications = data.filter(isCertification);

  const years = Array.from(
    { length: new Date().getFullYear() - 2002 },
    (_, i) => 2002 + i,
  );

  return (
    <div
      className={cn("grid")}
      style={{
        gridTemplateColumns: `repeat(${years.length * 12}, minmax(0, 1fr))`,
      }}
    >
      {[...companies].reverse().map((company) => (
        <TimelineEntry
          key={company.name}
          name={company.name}
          slug={company.slug}
          items={company.items}
          years={years}
          itemColor="secondary"
        />
      ))}

      <div className={cn("col-start-1", "col-span-full", "h-1")} />

      {[...schools].reverse().map((school) => (
        <TimelineEntry
          key={school.name}
          name={school.degree}
          slug={school.slug}
          items={[school]}
          years={years}
          itemColor="tertiary"
        />
      ))}

      <div className={cn("col-start-1", "col-span-full", "h-1")} />

      {[...certifications].reverse().map((certification) => (
        <TimelineEntry
          key={certification.name}
          name={certification.technology}
          slug={certification.slug}
          items={[
            {
              start: certification.date,
              end: addYears(new Date(certification.date), 1).toISOString(),
            },
          ]}
          years={years}
          itemColor="fourtiary"
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
