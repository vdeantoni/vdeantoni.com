import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect } from "react"
import Section from "./section"
import resume from "../../content/resume.yml"

const Resume = () => {
  const images = useStaticQuery(
    graphql`
      query {
        companies: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "companies" }
          }
        ) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }

        schools: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "schools" }
          }
        ) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }

        certifications: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "certifications" }
          }
        ) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }

        publications: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "publications" }
          }
        ) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }
      }
    `
  )

  useEffect(() => {})

  return (
    <section className="bg-gray-100">
      <div className="container">
        <h1 className="ty-h1 py-12">Resume</h1>
        <Section
          title="Experience"
          images={images.companies}
          items={resume.items.filter(item => item.type === "company")}
        />

        <Section
          title="Education"
          images={images.schools}
          items={resume.items.filter(item => item.type === "school")}
        />

        <Section
          title="Publications"
          images={images.publications}
          items={resume.items.filter(item => item.type === "publication")}
        />

        <Section
          title="Certifications"
          images={images.certifications}
          items={resume.items.filter(item => item.type === "certification")}
        />
      </div>
    </section>
  )
}

export default Resume
