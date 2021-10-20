import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout/layout";
import PostTeaser from "../components/post-teaser";
import Seo from "../components/seo.jsx";
import posts from "../data/posts.yml";

export const query = graphql`{
  image: file(name: {eq: "me"}) {
    childImageSharp {
      gatsbyImageData(width: 500, layout: CONSTRAINED)
    }
  }
}
`;

const IndexPage = ({ data }) => {
  const { image } = data;
  return (
    <Layout>
      <Seo title="Home" />
      <div className={cn("grid", "grid-cols-1", "md:grid-cols-2", "gap-8", "md:gap-12", "md:gap-16")}>
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt="Vinicius De Antoni"
          className={cn("w-full", "h-auto", "rounded-lg", "md:order-1")} />
        <div className={cn("flex", "flex-col", "items-center", "md:items-start")}>
          <h1 className={cn("font-extrabold")}>Hello,</h1>

          <p className={cn("text-lg", "leading-loose", "mt-10")}>
            My name is Vinicius De Antoni, and I am a generalist software engineer experienced in developing back-end
            services for web, desktop and mobile applications as well as building user experiences with web
            technologies.
          </p>
          <p className={cn("text-lg", "leading-loose", "mt-4")}>
            Throughout my career, I've worked with several different technologies in a variety of problem spaces. From
            embedded software for printers to a costumer support system, from e-commerce platforms to desktop
            applications.
          </p>
          <p className={cn("text-lg", "leading-loose", "mt-4")}>
            Motivated and eager for knowledge, I am very interested in customer facing applications and distributed
            systems, and I also have passion for game development, artificial intelligence and music.
          </p>
        </div>
      </div>
      <h2 className={cn("h3", "mt-10")}>Latest post</h2>
      <div className={cn("grid", "grid-cols-1", "gap-8", "md:gap-12", "lg:gap-16", "items-center", "mt-10")}>
        <PostTeaser post={posts[0]} />
      </div>
      <div className={cn("flex", "justify-end")}>
        <Link to="/posts" className={cn("button", "mt-6")}>
          View all
          <FontAwesomeIcon icon={["fas", "arrow-right"]} className={cn("ml-2")} />
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
