/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui";

import React from "react";
import posts from "../data/posts.yml";
import SEO from "../components/seo.jsx";
import { Container, Grid } from "theme-ui";
import Header from "../components/header";
import Footer from "../components/footer";
import PostTeaser from "../components/post-teaser";

const PostsPage = () => {
  return (
    <>
      <Header />
      <SEO
        title="Posts"
        description="A page with a list of all my public posts."
      />
      <Container py={[8, 12]}>
        <Styled.h1
          sx={{
            m: 0,
            fontWeight: "extrabold",
            lineHeight: "tight",
          }}
        >
          Posts
        </Styled.h1>

        <Grid columns="1" gap={[10, 20]} sx={{ mt: 10 }}>
          {posts &&
            posts.map((post, index) => (
              <Box key={index}>
                <PostTeaser post={post} />
              </Box>
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PostsPage;
