import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"

const Home = () => {
  const image = useStaticQuery(
    graphql`
      query {
        file(name: { eq: "me" }) {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  return (
    <>
      <section>
        <div className="container min-h-main-screen md:flex items-center md:flex-row-reverse">
          <div className="md:flex-1 flex justify-center md:pt-16">
            <Img
              fluid={image.file.childImageSharp.fluid}
              className="rounded-full m-8 max-w-sm w-full"
              alt="Vinicius De Antoni"
            ></Img>
          </div>
          <div className="md:flex-1 ty-rich-text">
            <h1>Hello,</h1>
            <p>
              I am a generalist software engineer experienced on developing
              backend services for web, desktop and mobile applications as well
              as building user experiences with web technologies.
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
      </section>
    </>
  )
}

export default Home
