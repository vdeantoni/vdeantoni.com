import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ResumePage = ({ data }) => (
  <Layout>
    <SEO title="Resume" />
    <section className="min-h-main-screen flex flex-col-reverse items-center md:flex-row">
      <h1 className="ty-h2">Resume</h1>
    </section>
  </Layout>
)

export default ResumePage
