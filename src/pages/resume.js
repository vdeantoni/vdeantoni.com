import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import resume from "../content/resume.yml"
import { graphql } from "gatsby"
import Img from "gatsby-image"

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
  }
`

const ResumePage = ({ data }) => {
  useEffect(() => {
    console.log(resume)
    console.log(data)
  })

  return (
    <Layout>
      <SEO title="Resume" />
      <section className="min-h-main-screen">
        <h1 className="ty-h1 mb-12">Resume</h1>
        {resume.companies.map(company => (
          <div key={company.name} className="flex">
            <div className="w-32 h-32 flex justify-center items-start">
              <Img
                fluid={
                  data.companies.nodes.find(node => node.name === company.image)
                    .childImageSharp.fluid
                }
                alt={`${company.name}'s logo`}
                className="w-20"
                imgStyle={{ objectFit: "contain" }}
              ></Img>
            </div>
            <h2 className="ty-h6">{company.name}</h2>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default ResumePage
