import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import resume from "../content/resume.yml"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export const query = graphql`
  query {
    riot: file(name: { eq: "riot" }) {
      childImageSharp {
        fluid(maxWidth: 64) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    blizzard: file(name: { eq: "blizzard" }) {
      childImageSharp {
        fluid(maxWidth: 64) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    amazon: file(name: { eq: "amazon" }) {
      childImageSharp {
        fluid(maxWidth: 67) {
          ...GatsbyImageSharpFluid
        }
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
                fluid={data[company.image].childImageSharp.fluid}
                alt={`${company.name}'s logo`}
                className="w-20 h-20"
                imgStyle={{ objectFit: 'fill' }}
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
