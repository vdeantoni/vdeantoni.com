import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import me from "../assets/images/me.jpg"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <section className="min-h-main-screen flex flex-col-reverse items-center md:flex-row">
      <div className="ty-rich-text flex-1">
        <h1>Hello,</h1>
        <p>
          I am a generalist software engineer experienced on developing backend
          services for web, desktop and mobile applications as well as building
          user experiences with web technologies.
        </p>
        <p>
          Throughout my career I've worked with several different technologies
          in a variety of problem spaces. From embedded software for printers to
          a costumer support system, from e-commerce platforms to desktop
          applications.
        </p>
        <p>
          Motivated and eager for knowledge, I am very interested in customer
          facing applications and distributed systems, and I also have passion
          for game development, artificial intelligence and music.
        </p>
      </div>
      <div className="flex-1 flex justify-center md:pt-16">
        <img className="rounded-full p-8 max-w-sm" src={me} alt="Vinicius De Antoni"></img>
      </div>
    </section>
  </Layout>
)

//  ## Skills
// * Java
// * Javascript and Typescript
// * HTML and CSS
// * Frameworks: Spring, NodeJS, Angular, React, Vue, .NET
// * SQL and NoSQL
// * AWS

export default IndexPage
