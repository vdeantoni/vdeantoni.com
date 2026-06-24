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
  color,
}: {
  name: string;
  slug: string;
  items: TimelinePeriod[];
  years: number[];
  color: "primary" | "secondary" | "tertiary";
}) => {
  const bgColor =
    color === "primary"
      ? "bg-primary/80 hover:bg-primary"
      : color === "secondary"
        ? "bg-secondary/60 hover:bg-secondary/80"
        : "bg-tertiary/80 hover:bg-tertiary";

  return (
    <a
      href={`#${slug}`}
      className="group flex items-center overflow-hidden hover:overflow-visible"
      style={{
        gridColumn: `${getStartIndex(items, years)} / span ${getSpanSize(items)}`,
      }}
    >
      <span
        className={cn(
          "block w-full h-6 rounded-full text-[10px] font-mono leading-6",
          "text-white text-center whitespace-nowrap overflow-hidden",
          "transition-all duration-200",
          bgColor,
        )}
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
      className="grid gap-y-1.5"
      style={{
        gridTemplateColumns: `repeat(${years.length * 12}, minmax(0, 1fr))`,
      }}
    >
      {/* Companies row — sorted by start date ascending so grid auto-placement
          packs non-overlapping roles onto one row and only drops a line on
          overlap (earliest start wins the top row). ISO date strings sort
          lexicographically. */}
      {[...companies]
        .sort((a, b) =>
          a.items.at(-1)!.start.localeCompare(b.items.at(-1)!.start),
        )
        .map((company) => (
          <TimelineEntry
            key={company.name}
            name={company.name}
            slug={company.slug}
            items={company.items}
            years={years}
            color="primary"
          />
        ))}

      <div className="col-start-1 col-span-full h-2" />

      {/* Schools row */}
      {[...schools].reverse().map((school) => (
        <TimelineEntry
          key={school.name}
          name={school.degree}
          slug={school.slug}
          items={[school]}
          years={years}
          color="secondary"
        />
      ))}

      <div className="col-start-1 col-span-full h-2" />

      {/* Certifications row */}
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
          color="tertiary"
        />
      ))}

      <div className="col-start-1 col-span-full h-3" />

      {/* Year labels */}
      {years.map((year, index) => (
        <div
          key={year}
          className="text-center pt-2 border-t border-border/50"
          style={{ gridColumn: "span 12 / span 12" }}
        >
          <span className="text-[10px] font-mono text-muted-foreground">
            {index === years.length - 1 ? "Now" : index % 4 === 0 ? year : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
