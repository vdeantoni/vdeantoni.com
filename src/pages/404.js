import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section className="container min-h-main-screen flex items-center justify-center flex-col">
      <h1 className="ty-h1">404: NOT FOUND</h1>
    </section>
  </Layout>
)

export default NotFoundPage
