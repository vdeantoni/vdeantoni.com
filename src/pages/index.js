import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { Blurb } from "../components/home/blurb"
import Layout from "../components/layout"
import { MediumCard } from "../components/publication/medium-card"
import SEO from "../components/seo"
import publications from "../content/publications.yml"

export const query = graphql`
  query {
    image: file(name: { eq: "me" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const { image } = data

  return (
    <Layout>
      <SEO title="Home" />

      <section>
        <div className="container min-h-main-screen flex items-center justify-center flex-col">
          <div className="md:flex items-center  md:flex-row-reverse">
            <div className="md:flex-1 flex justify-center md:pt-16">
              <Img
                fluid={image.childImageSharp.fluid}
                className="rounded-full m-8 max-w-xs w-full"
                alt="Vinicius De Antoni"
              ></Img>
            </div>
            <div className="md:flex-1 ty-rich-text text-justify">
              <Blurb></Blurb>
            </div>
          </div>
          <div className="self-start my-8">
            <h2 className="ty-h5 mb-4">Latest publication</h2>

            <MediumCard post={publications.items[0]}></MediumCard>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
