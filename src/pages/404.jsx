/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react'

import SEO from "../components/seo";
import Header from "../components/header";
import { Container, Styled } from "theme-ui";
import Footer from "../components/footer";

const NotFoundPage = () => (
  <>
    <Header />
    <SEO title="404: Page Not Found" />
    <Container py={[8, 12]}>
      <Styled.h1
        sx={{
          m: 0,
          fontWeight: "extrabold",
          lineHeight: "tight",
        }}
      >
        404: Page Not Found
      </Styled.h1>
    </Container>
    <Footer />
  </>
);

export default NotFoundPage;
