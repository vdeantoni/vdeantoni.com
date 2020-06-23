import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
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
            <div className="md:flex-1 text-justify">
              <h1 className="heading text-6xl py-12">Hello,</h1>
              <p className="leading-relaxed">
                I am a generalist software engineer experienced on developing
                backend services for web, desktop and mobile applications as
                well as building user experiences with web technologies.
              </p>
              <p className="mt-3 leading-relaxed">
                Throughout my career I've worked with several different
                technologies in a variety of problem spaces. From embedded
                software for printers to a costumer support system, from
                e-commerce platforms to desktop applications.
              </p>
              <p className="mt-3 leading-relaxed">
                Motivated and eager for knowledge, I am very interested in
                customer facing applications and distributed systems, and I also
                have passion for game development, artificial intelligence and
                music.
              </p>
            </div>
          </div>
          <div className="self-start my-12 lg:w-1/2">
            <h2 className="heading text-2xl mb-4">Latest publication</h2>

            <MediumCard post={publications.items[0]}></MediumCard>

            <Link
              title="View All"
              to="/publications"
              className="text-right block mt-2"
            >
              View All
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
