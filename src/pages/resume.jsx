import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { addYears, formatISO } from "date-fns";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { groupBy } from "lodash";
import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo.jsx";
import SectionGrid from "../components/styled/section-grid";
import Timeline from "../components/timeline";
import resume from "../data/resume.yml";
import { formatDate, formatTimeDifference } from "../utils/date";

const timeDifference = (periods) => {
  if (!periods || periods.length < 1) {
    return null;
  }

  return formatTimeDifference(periods[periods.length - 1].start, periods[0].end);
};

const timePeriod = (start, end) => {
  return `${formatDate(start)} - ${end ? formatDate(end) : "Present"}`;
};

const SectionTitle = ({ title, icon }) => {
  return (
    <h2 className={cn("h4", "mt-10", "flex", "items-center")}>
      <FontAwesomeIcon icon={["fas", icon]} size="1x" className={cn("mr-3")} />
      {title}
    </h2>
  );
};

const EntryTitle = ({ title, subTitle, slug }) => {
  return (
    <div className={cn("flex", "flex-col", "md:items-end", "md:sticky", "top-2")}>
      <h3 id={slug} className={cn("h6")}>
        {title}
      </h3>
      <span className={cn("opacity-75")}>{subTitle}</span>
    </div>
  );
};

const EntryItem = ({ title, start, end, location, blurb, subItems, links, itemColor }) => {
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
      <div className={cn("text-sm", "opacity-75")}>{timePeriod(start, end)}</div>
      <div className={cn("text-sm", "opacity-75")}>{location}</div>
      <div className={cn("mt-2")}>{blurb}</div>
      <ul className={cn("list-inside", "list-disc", "mt-2", "mb-4")}>
        {subItems?.map((subItem, subItemIndex) => (
          <li key={subItemIndex} className={cn("text-sm", "leading-relaxed")}>
            {subItem}
          </li>
        ))}
      </ul>

      {links?.map((link, linkIndex) => (
        <OutboundLink key={linkIndex} href={link.url} rel="noopener noreferrer" className={cn("mt-2")}>
          {link.name}
        </OutboundLink>
      ))}
    </div>
  );
};

const ResumePage = () => {
  const { company: companies, school: schools, certification: certifications } = groupBy(resume, "type");

  return (
    <Layout>
      <Seo title="Resume" description="A page with information about my employment and education history" />
      <h1 className={cn("font-extrabold")}>Resume</h1>

      <div className={"hidden md:block"}>
        <SectionTitle title="Timeline" icon="stream" />
        <div className={cn("mt-10")}>
          <Timeline data={resume} />
        </div>
      </div>

      <SectionTitle title="Employment" icon="briefcase" />
      {companies.map((entry, entryIndex) => (
        <SectionGrid key={entryIndex} className={cn("mt-10")}>
          <EntryTitle title={entry.name} slug={entry.slug} subTitle={timeDifference(entry.items)} />
          <div>
            {entry.items?.map((item, itemIndex) => (
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
        </SectionGrid>
      ))}

      <SectionTitle title="Education" icon="university" />
      {schools.map((entry, entryIndex) => (
        <SectionGrid key={entryIndex} className={cn("mt-10")}>
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
        </SectionGrid>
      ))}

      <SectionTitle title="Certifications" icon="award" />
      {certifications.map((entry, entryIndex) => (
        <SectionGrid key={entryIndex} className={cn("mt-10")}>
          <EntryTitle title={entry.entity} slug={entry.slug} />
          <div>
            <EntryItem
              title={entry.name}
              itemColor="tertiary"
              start={entry.date}
              end={formatISO(addYears(new Date(entry.date), 1))}
            />
          </div>
        </SectionGrid>
      ))}
    </Layout>
  );
};

export default ResumePage;
