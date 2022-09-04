import {
  faAward,
  faBriefcase,
  faStream,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { addYears, formatISO } from "date-fns";
import { first, groupBy, last } from "lodash";
import Head from "next/head";
import React, { FC } from "react";
import Timeline from "../components/Timeline";
import resume from "../data/resume.yml";
import { formatDate, formatTimeDifference } from "../utils/date";

export const getStaticProps = () => {
  return {
    props: {
      RESUME: resume,
    },
  };
};

const timeDifference = (periods: any[]): string | null => {
  if (!periods || periods.length < 1) {
    return null;
  }

  return formatTimeDifference(last(periods).start, first(periods).end);
};

const timePeriod = (start: string, end: string): string => {
  return `${formatDate(start)} - ${end ? formatDate(end) : "Present"}`;
};

const SectionTitle: FC<any> = ({ title, icon }) => {
  return (
    <h2 className={cn("h4", "mt-10", "flex", "items-center")}>
      <FontAwesomeIcon icon={icon} size="1x" className={cn("w-6", "mr-3")} />
      {title}
    </h2>
  );
};

const EntryTitle: FC<any> = ({ title, subTitle, slug }) => {
  return (
    <div
      className={cn("flex", "flex-col", "md:items-end", "md:sticky", "top-2")}
    >
      <h3 id={slug} className={cn("h6")}>
        {title}
      </h3>
      <span className={cn("opacity-75", "text-sm")}>{subTitle}</span>
    </div>
  );
};

const EntryItem = ({
  title,
  start,
  end,
  location,
  blurb,
  subItems,
  links,
  itemColor,
}: any) => {
  return (
    <div
      className={cn(
        "relative",
        "before:hidden",
        "md:before:block",
        "before:absolute",
        "before:opacity-50",
        "before:h-full",
        "before:top-[1.25rem]",
        "before:left-[-1.2rem]",
        "before:border-dashed",
        "before:border-l"
      )}
    >
      <div
        className={cn(
          "relative",
          "text-lg",
          "before:hidden",
          "md:before:block",
          "before:absolute",
          "before:rounded-md",
          "before:opacity-50",
          "before:top-[5px]",
          "before:left-[-1.65rem]",
          "before:w-[1rem]",
          "before:h-[1rem]",
          itemColor === "secondary"
            ? "before:bg-secondary"
            : itemColor === "tertiary"
            ? "before:bg-tertiary"
            : "before:bg-primary"
        )}
      >
        {title}
      </div>
      <div className={cn("text-sm", "opacity-75")}>
        {timePeriod(start, end)}
      </div>
      <div className={cn("text-sm", "opacity-75")}>{location}</div>
      <div className={cn("mt-2")}>{blurb}</div>
      <ul className={cn("list-inside", "list-disc", "mt-2", "mb-4")}>
        {subItems?.map((subItem: any, subItemIndex: number) => (
          <li key={subItemIndex} className={cn("text-sm", "leading-relaxed")}>
            {subItem}
          </li>
        ))}
      </ul>

      {links?.map((link: any, linkIndex: number) => (
        <a key={linkIndex} href={link.url} className={cn("mt-2")}>
          {link.name}
        </a>
      ))}
    </div>
  );
};

const ResumePage: FC<{ RESUME: any }> = ({ RESUME }) => {
  const {
    company: companies,
    school: schools,
    certification: certifications,
  } = groupBy(RESUME, "type");

  return (
    <>
      <Head>
        <title>vdeantoni.com | Resume</title>
        <meta
          name="description"
          content="A page with information about my employment and education history"
        />
      </Head>
      <h1 className={cn("font-extrabold")}>Resume</h1>

      <div className={"hidden md:block"}>
        <SectionTitle title="Timeline" icon={faStream} />
        <div
          className={cn(
            "mt-10",
            "xl:w-[calc(100vw-4rem)]",
            "xl:ml-[calc(36rem-50vw)]"
          )}
        >
          <Timeline data={RESUME} />
        </div>
      </div>

      <SectionTitle title="Employment" icon={faBriefcase} />
      {companies.map((entry, entryIndex) => (
        <div key={entryIndex} className={cn("section-grid", "mt-10")}>
          <EntryTitle
            title={entry.name}
            slug={entry.slug}
            subTitle={timeDifference(entry.items)}
          />
          <div>
            {entry.items?.map((item: any, itemIndex: number) => (
              <EntryItem
                key={itemIndex}
                title={item.title}
                itemColor="primary"
                start={item.start}
                end={item.end}
                location={item.location}
                blurb={item.blurb}
                subItems={item.subItems}
              />
            ))}
          </div>
        </div>
      ))}

      <SectionTitle title="Education" icon={faUniversity} />
      {schools.map((entry, entryIndex) => (
        <div key={entryIndex} className={cn("section-grid", "mt-10")}>
          <EntryTitle title={entry.name} slug={entry.slug} />
          <div>
            <EntryItem
              title={entry.degree}
              itemColor="secondary"
              start={entry.start}
              end={entry.end}
              location={entry.location}
              blurb={entry.field}
              links={entry.publications}
            />
          </div>
        </div>
      ))}

      <SectionTitle title="Certifications" icon={faAward} />
      {certifications.map((entry, entryIndex) => (
        <div key={entryIndex} className={cn("section-grid", "mt-10")}>
          <EntryTitle title={entry.entity} slug={entry.slug} />
          <div>
            <EntryItem
              title={entry.name}
              itemColor="tertiary"
              start={entry.date}
              end={formatISO(addYears(new Date(entry.date), 1))}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ResumePage;
