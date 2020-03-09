import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

import me from "../assets/images/me.jpg"

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "About" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="About" />
    <section className="min-h-main-screen flex flex-col-reverse items-center md:flex-row">
      <div
        className="ty-rich-text flex-1"
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.edges[0].node.html,
        }}
      />
      <div className="flex-1 flex justify-center md:pt-16">
        <img className="rounded-full p-8 max-w-sm" src={me}></img>
      </div>
    </section>
  </Layout>
)

export default IndexPage
