import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as $ from "classnames";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import Layout from "../components/layout/layout";
import Location from "../components/location";
import SEO from "../components/seo.jsx";
import TimeDifference from "../components/time-difference";
import TimePeriod from "../components/time-period";
import resume from "../data/resume.yml";
import "../styles/resume.css";
import SectionGrid from "../components/styled/section-grid";

const ResumePage = () => {
  return (
    <Layout>
      <SEO
        title="Resume"
        description="A page with information about my employment and education history"
      />
      <h1 className={$("font-extrabold")}>Resume</h1>

      <h2 className={$("h4", "mt-10")}>
        <FontAwesomeIcon
          icon={["fas", "code"]}
          size="1x"
          className={$("mr-3", "align-text-top")}
        />
        Skills
      </h2>
      <div className={$("mt-10")}>
        <div className={$("flex", "justify-start", "flex-wrap")}>
          {resume
            .filter((r) => r.type === "skills")
            .flatMap((s) => s.items)
            .map((entry, entryIndex) => (
              <div
                key={entryIndex}
                className={$("border", "rounded-lg", "px-3", "py-1", "m-2")}
              >
                {entry.name}
              </div>
            ))}
        </div>
      </div>

      <h2 className={$("h4", "mt-10")}>
        <FontAwesomeIcon
          icon={["fas", "briefcase"]}
          size="1x"
          className={$("mr-3", "align-text-top")}
        />
        Employment
      </h2>
      {resume
        .filter((r) => r.type === "company")
        .map((entry, entryIndex) => (
          <SectionGrid key={entryIndex} className={$("mt-10")}>
            <div className={$("flex", "flex-col", "lg:items-end")}>
              <h3 className={$("h6")}>{entry.name}</h3>
              <TimeDifference
                periods={entry.items}
                className={$("opacity-50")}
              />
            </div>
            <div>
              {entry.items &&
                entry.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={$("timeline")}>
                    <div
                      className={$("point", "text-lg", {
                        first: entryIndex === 0,
                      })}
                    >
                      {item.title}
                    </div>
                    <TimePeriod
                      start={item.start}
                      end={item.end}
                      className={$("text-sm", "opacity-50")}
                    />
                    <Location
                      location={item.location}
                      className={$("text-sm", "opacity-50")}
                    />
                    <div className={$("mt-2")}>{item.blurb}</div>
                    <ul
                      className={$("list-inside", "list-disc", "mt-2", "mb-4")}
                    >
                      {item.subItems &&
                        item.subItems.map((subItem, subItemIndex) => (
                          <li
                            key={subItemIndex}
                            className={$("text-sm", "leading-relaxed")}
                          >
                            {subItem}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </SectionGrid>
        ))}

      <h2 className={$("h4", "mt-10")}>
        <FontAwesomeIcon
          icon={["fas", "university"]}
          size="1x"
          className={$("mr-3")}
        />
        Education
      </h2>

      {resume
        .filter((r) => r.type === "school")
        .map((entry, entryIndex) => (
          <SectionGrid key={entryIndex} className={$("mt-10")}>
            <h3 className={$("h6", "text-left", "lg:text-right")}>
              {entry.name}
            </h3>
            <div className={$("timeline")}>
              <div className={$("text-lg", "point")}>{entry.degree}</div>
              <TimePeriod
                start={entry.start}
                end={entry.end}
                className={$("text-sm", "opacity-50")}
              />
              <Location
                location={entry.location}
                className={$("text-sm", "opacity-50")}
              />

              <div className={$("mt-2")}>{entry.field}</div>

              {entry.publications &&
                entry.publications.map((publication, publicationIndex) => (
                  <OutboundLink
                    key={publicationIndex}
                    href={publication.link}
                    rel="noopener noreferrer"
                    className={$("mt-2")}
                  >
                    {publication.name}
                  </OutboundLink>
                ))}
            </div>
          </SectionGrid>
        ))}

      <h2 className={$("h4", "mt-10")}>
        <FontAwesomeIcon
          icon={["fas", "award"]}
          size="1x"
          className={$("mr-3")}
        />
        Certifications
      </h2>

      {resume
        .filter((r) => r.type === "certification")
        .map((entry, entryIndex) => (
          <SectionGrid key={entryIndex} className={$("mt-10")}>
            <h3 className={$("h6", "text-left", "lg:text-right")}>
              {entry.entity}
            </h3>
            <div className={$("timeline")}>
              <div className={$("text-lg", "point")}>{entry.name}</div>
              <TimePeriod
                start={entry.start}
                end={entry.end}
                className={$("text-sm", "opacity-50")}
              />
            </div>
          </SectionGrid>
        ))}
    </Layout>
  );
};

export default ResumePage;
