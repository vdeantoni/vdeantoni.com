import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as $ from "classnames";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Layout from "../components/layout/layout";
import PostTeaser from "../components/post-teaser";
import SEO from "../components/seo.jsx";
import posts from "../data/posts.yml";

export const query = graphql`
  query {
    image: file(name: { eq: "me" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const { image } = data;
  return (
    <Layout>
      <SEO title="Home" />
      <div
        className={$(
          "grid",
          "grid-cols-1",
          "md:grid-cols-2",
          "gap-8",
          "md:gap-12",
          "md:gap-16"
        )}
      >
        <Img
          fluid={image.childImageSharp.fluid}
          alt="Vinicius De Antoni"
          className={$("w-full", "h-auto","rounded-lg", "md:order-1")}
        ></Img>
        <div
          className={$("flex", "flex-col", "items-center", "md:items-start")}
        >
          <h1 className={$("font-extrabold")}>Hello,</h1>

          <p className={$("text-lg", "leading-relaxed", "mt-10")}>
            My name is Vinicius De Antoni, and I am a generalist software
            engineer experienced in developing back-end services for web, desktop
            and mobile applications as well as building user experiences with
            web technologies.
          </p>
          <p className={$("text-lg", "leading-relaxed", "mt-4")}>
            Throughout my career, I've worked with several different technologies
            in a variety of problem spaces. From embedded software for printers
            to a costumer support system, from e-commerce platforms to desktop
            applications.
          </p>
          <p className={$("text-lg", "leading-relaxed", "mt-4")}>
            Motivated and eager for knowledge, I am very interested in customer
            facing applications and distributed systems, and I also have passion
            for game development, artificial intelligence and music.
          </p>
        </div>
      </div>
      <h2 className={$("h3", "mt-10")}>Latest post</h2>
      <div
        className={$(
          "grid",
          "grid-cols-1",
          "gap-8",
          "md:gap-12",
          "lg:gap-16",
          "items-center",
          "mt-10",
        )}
      >
        <PostTeaser post={posts[0]} />
      </div>
      <div className={$("flex", "justify-end")}>
        <Link to="/posts" className={$("button", "mt-6")}>
          View all
          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            className={$("ml-2")}
          />
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
