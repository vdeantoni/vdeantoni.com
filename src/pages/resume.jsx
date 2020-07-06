/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui";

import React from "react";
import resume from "../data/resume.yml";
import SEO from "../components/seo.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Flex } from "theme-ui";
import Header from "../components/header";
import Footer from "../components/footer";
import TimeDifference from "../components/time-difference";
import TimePeriod from "../components/time-period";
import Location from "../components/location";

const ResumePage = () => {
  return (
    <>
      <Header />
      <SEO
        title="Resume"
        description="A page with information about my employment and education history"
      />
      <Container py={[8, 12]}>
        <Styled.h1
          sx={{
            m: 0,
            fontWeight: "extrabold",
            lineHeight: "tight",
          }}
        >
          Resume
        </Styled.h1>

        <Styled.h4
          sx={{
            mt: 10,
            fontWeight: "extrabold",
            lineHeight: "tight",
          }}
        >
          <Flex>
            <FontAwesomeIcon
              icon={["fas", "briefcase"]}
              size="1x"
              sx={{ mr: 2 }}
            />{" "}
            Employment
          </Flex>
        </Styled.h4>
        {resume &&
          resume
            .filter((r) => r.type === "company")
            .map((entry, entryIndex) => (
              <Box key={entryIndex}>
                <Grid
                  columns={["1", "1", "350px 1fr", "400px 1fr"]}
                  gap={[10, 20]}
                  sx={{ alignItems: "flex-start", mt: 10 }}
                >
                  <Flex
                    sx={{
                      flexDirection: "column",
                      alignItems: [null, null, "flex-end"],
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "lg",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.name}
                    </Box>
                    <Box>
                      <TimeDifference
                        periods={entry.items}
                        sx={{ opacity: 0.5 }}
                      />
                    </Box>
                  </Flex>
                  <Box>
                    {entry.items &&
                      entry.items.map((item, itemIndex) => (
                        <Box
                          key={itemIndex}
                          sx={{
                            position: "relative",
                            "::before": {
                              content: '""',
                              position: "absolute",
                              top: 1,
                              left: "-2.55rem",
                              width: "1px",
                              borderLeft: "1px dashed",
                              borderColor: "text",
                              opacity: 0.12,
                              height: "calc(100% + 1rem)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: "lg",
                              position: "relative",
                              "::before": {
                                content: '""',
                                position: "absolute",
                                top: "5px",
                                left: -12,
                                width: 4,
                                height: 4,
                                borderRadius: 4,
                                opacity: entryIndex === 0 ? 1 : 0.75,
                                backgroundColor: "primary",
                              },
                            }}
                          >
                            {item.title}
                          </Box>
                          <TimePeriod
                            start={item.start}
                            end={item.end}
                            sx={{ fontSize: "sm", opacity: 0.5 }}
                          />
                          <Location
                            location={item.location}
                            sx={{ fontSize: "sm", opacity: 0.5 }}
                          />
                          <Box sx={{ fontSize: "md", mt: 2 }}>{item.blurb}</Box>
                          <Styled.ul>
                            {item.subItems &&
                              item.subItems.map((subItem, subItemIndex) => (
                                <Styled.li
                                  key={subItemIndex}
                                  sx={{ fontSize: "sm", lineHeight: "relaxed" }}
                                >
                                  {subItem}
                                </Styled.li>
                              ))}
                          </Styled.ul>
                        </Box>
                      ))}
                  </Box>
                </Grid>
              </Box>
            ))}
        <Styled.h4
          sx={{
            mt: 10,
            fontWeight: "extrabold",
            lineHeight: "tight",
          }}
        >
          <Flex>
            <FontAwesomeIcon
              icon={["fas", "university"]}
              size="1x"
              sx={{ mr: 2 }}
            />{" "}
            Education
          </Flex>
        </Styled.h4>
        {resume &&
          resume
            .filter((r) => r.type === "school")
            .map((entry, entryIndex) => (
              <Grid
                key={entryIndex}
                columns={["1", "1", "350px 1fr", "400px 1fr"]}
                gap={[10, 20]}
                sx={{ alignItems: "flex-start", mt: 10 }}
              >
                <Box
                  sx={{
                    fontSize: "lg",
                    fontWeight: "bold",
                    textAlign: ["left", "left", "right"],
                  }}
                >
                  {entry.name}
                </Box>
                <Box>
                  <Box sx={{ fontSize: "lg" }}>{entry.degree}</Box>
                  <TimePeriod
                    start={entry.start}
                    end={entry.end}
                    sx={{ fontSize: "sm", opacity: 0.5 }}
                  />
                  <Location
                    location={entry.location}
                    sx={{ fontSize: "sm", opacity: 0.5 }}
                  />

                  <Box sx={{ fontSize: "md", mt: 2 }}>{entry.field}</Box>

                  {entry.publications &&
                    entry.publications.map((publication, publicationIndex) => (
                      <Styled.a
                        key={publicationIndex}
                        href={publication.link}
                        sx={{
                          mt: "2",
                          fontSize: "md",
                        }}
                      >
                        {publication.name}
                      </Styled.a>
                    ))}
                </Box>
              </Grid>
            ))}
        <Styled.h4
          sx={{
            mt: 10,
            fontWeight: "extrabold",
            lineHeight: "tight",
          }}
        >
          <Flex>
            <FontAwesomeIcon icon={["fas", "award"]} size="1x" sx={{ mr: 2 }} />{" "}
            Certifications
          </Flex>
        </Styled.h4>
        {resume &&
          resume
            .filter((r) => r.type === "certification")
            .map((entry, entryIndex) => (
              <Grid
                key={entryIndex}
                columns={["1", "1", "350px 1fr", "400px 1fr"]}
                gap={[10, 20]}
                sx={{ alignItems: "flex-start", mt: 10 }}
              >
                <Box
                  sx={{
                    fontSize: "lg",
                    fontWeight: "bold",
                    textAlign: ["left", "left", "right"],
                  }}
                >
                  {entry.entity}
                </Box>
                <Box>
                  <Box sx={{ fontSize: "lg" }}>{entry.name}</Box>
                  <TimePeriod
                    start={entry.start}
                    end={entry.end}
                    sx={{ fontSize: "sm", opacity: 0.5 }}
                  />
                </Box>
              </Grid>
            ))}
      </Container>
      <Footer />
    </>
  );
};

export default ResumePage;
