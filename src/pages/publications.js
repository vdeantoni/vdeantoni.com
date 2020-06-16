import React from "react";
import Layout from "../components/layout";
import { MediumCard } from "../components/publication/medium-card";
import SEO from "../components/seo";
import publications from "../content/publications.yml";

const PublicationsPage = () => {
  const posts = publications.items;

  return (
    <Layout>
      <SEO title="Publications" />

      <section>
        <div className="container min-h-main-screen pb-8">
          <h1 className="ty-h1 py-12">Publications</h1>
          <ul className="max-w-3xl">
            {posts.map((post) => (
              <li key={`post-${post.id}`} className="mb-8 last:mb-0">
                <MediumCard post={post}></MediumCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default PublicationsPage
