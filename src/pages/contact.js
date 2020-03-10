import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = ({ data }) => (
  <Layout>
    <SEO title="Contact" />
    <section className="min-h-main-screen flex flex-col-reverse items-center md:flex-row">
      <h1 className="ty-h2">Contact</h1>
    </section>
  </Layout>
)

export default ContactPage
