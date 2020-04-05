import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import { MediumCard } from "../components/publication/medium-card"
import SEO from "../components/seo"

export const query = graphql`
  query {
    posts: allMediumPost(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        id
        title
        virtuals {
          subtitle
          previewImage {
            imageId
          }
          tags {
            name
          }
          readingTime
        }
        createdAt
        uniqueSlug
      }
    }

    publicationImages: allFile(
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

const PublicationsPage = ({ data }) => {
  const posts = data.posts.nodes

  return (
    <Layout>
      <SEO title="Publications" />

      <section>
        <div className="container min-h-main-screen">
          <h1 className="ty-h1 py-12">Publications</h1>
          <ul>
            {posts.map((p) => (
              <li key={`post-${p.id}`} className="mb-8 last:mb-0">
                <MediumCard post={p}></MediumCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default PublicationsPage
