import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Section from "../components/resume/section"
import SEO from "../components/seo"
import resume from "../content/resume.yml"

export const query = graphql`
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

const ResumePage = ({ data }) => {
  const images = data

  return (
    <Layout>
      <SEO title="Resume" />

      <section>
        <div className="container">
          <h1 className="ty-h1 py-12">Resume</h1>
          <Section
            title="Experience"
            images={images.companies}
            items={resume.items.filter((item) => item.type === "company")}
          />

          <Section
            title="Education"
            images={images.schools}
            items={resume.items.filter((item) => item.type === "school")}
          />

          <Section
            title="Publications"
            images={images.publications}
            items={resume.items.filter((item) => item.type === "publication")}
          />

          <Section
            title="Certifications"
            images={images.certifications}
            items={resume.items.filter((item) => item.type === "certification")}
          />
        </div>
      </section>
    </Layout>
  )
}

export default ResumePage
