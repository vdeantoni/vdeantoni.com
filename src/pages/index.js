import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "../components/home/home"
import Resume from "../components/resume/resume"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Home />
    <Resume />
  </Layout>
)

export default IndexPage
