import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import React from "react"

const Home = () => {
  const { image, latestPublication } = useStaticQuery(
    graphql`
      query {
        image: file(name: { eq: "me" }) {
          childImageSharp {
            fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        latestPublication: allMediumPost(
          sort: { fields: [createdAt], order: DESC }
          limit: 1
        ) {
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
      }
    `
  )
  return (
    <>
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
              <h1>Hello,</h1>
              <p>
                I am a generalist software engineer experienced on developing
                backend services for web, desktop and mobile applications as
                well as building user experiences with web technologies.
              </p>
              <p>
                Throughout my career I've worked with several different
                technologies in a variety of problem spaces. From embedded
                software for printers to a costumer support system, from
                e-commerce platforms to desktop applications.
              </p>
              <p>
                Motivated and eager for knowledge, I am very interested in
                customer facing applications and distributed systems, and I also
                have passion for game development, artificial intelligence and
                music.
              </p>
            </div>
          </div>
          <div className="self-start my-8">
            <h2 className="ty-h5 mb-4">Latest publication</h2>

            <OutboundLink
              className="flex ty-link text-black"
              href={`https://medium.com/@vdeantoni/${latestPublication.nodes[0].uniqueSlug}`}
              target="_blank"
            >
              <div className="">
                <img
                  src={`https://miro.medium.com/fit/c/128/128/${latestPublication.nodes[0].virtuals.previewImage.imageId}`}
                  alt="Publication thumbnail"
                  className="object-cover"
                  style={{ width: 128, height: 128 }}
                ></img>
              </div>
              <div className="flex-1 flex flex-col ml-4">
                <h4 className="mb-1">
                  <FontAwesomeIcon icon={["fab", "medium"]} className="mr-1" />
                  Medium
                </h4>
                <h3 className="font-bold leading-tight">
                  {latestPublication.nodes[0].title}
                </h3>
                <p className="text-sm opacity-75">
                  {latestPublication.nodes[0].virtuals.subtitle}
                </p>
                <div className="flex-1 flex justify-around items-end">
                  {(latestPublication.nodes[0].virtuals.tags || []).map(
                    (tag) => (
                      <div
                        key={`tag-${tag.name}`}
                        className="text-xs font-thin border-gray-300 rounded border-solid border p-1"
                      >
                        {tag.name}
                      </div>
                    )
                  )}
                </div>
              </div>
            </OutboundLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
