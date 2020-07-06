/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import React from "react";
import posts from "../data/posts.yml";
import SEO from "../components/seo.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "gatsby-image";
import { Container, Grid, Flex, Button } from "theme-ui";
import { graphql, Link } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import PostTeaser from "../components/post-teaser";

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
    <>
      <Header />
      <SEO title="Home" />
      <Container py={[8, 12]}>
        <Grid columns={[1, 2]} gap={[8, 12, 16]} sx={{ alignItems: "center" }}>
          <Img
            fluid={image.childImageSharp.fluid}
            alt="Vinicius De Antoni"
            sx={{
              width: "100%",
              borderRadius: "lg",
              order: [null, 1],
            }}
          ></Img>
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: ["center", "flex-start"],
            }}
          >
            <Styled.h1
              sx={{
                m: 0,
                fontWeight: "extrabold",
                lineHeight: "tight",
              }}
            >
              Hello,
            </Styled.h1>
            <Styled.p sx={{ fontSize: ["md", "lg"], mt: 10 }}>
              My name is Vinicius De Antoni, and I am a generalist software
              engineer experienced on developing backend services for web,
              desktop and mobile applications as well as building user
              experiences with web technologies.
            </Styled.p>
            <Styled.p sx={{ fontSize: ["md", "lg"], mt: 2 }}>
              Throughout my career I've worked with several different
              technologies in a variety of problem spaces. From embedded
              software for printers to a costumer support system, from
              e-commerce platforms to desktop applications.
            </Styled.p>
            <Styled.p sx={{ fontSize: ["md", "lg"], mt: 2 }}>
              Motivated and eager for knowledge, I am very interested in
              customer facing applications and distributed systems, and I also
              have passion for game development, artificial intelligence and
              music.
            </Styled.p>
          </Flex>
        </Grid>
        <Styled.h3>Latest post</Styled.h3>
        <Grid
          columns="1"
          gap={[8, 12, 16]}
          sx={{ alignItems: "center", mt: 8 }}
        >
          <PostTeaser post={posts[0]} />
        </Grid>
        <Flex sx={{ justifyContent: "flex-end" }}>
          <Button as={Link} to="/posts" variant="primary" sx={{ mt: 6 }}>
            View all
            <FontAwesomeIcon icon={["fas", "arrow-right"]} sx={{ ml: 2 }} />
          </Button>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default IndexPage;
