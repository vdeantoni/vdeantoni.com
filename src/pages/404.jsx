import React from "react";
import SEO from "../components/seo";

import { Section, Container, Flexbox, H1 } from "@reflexjs/components";

const NotFoundPage = () => (
  <Section py="8|12">
    <Container>
      <SEO title="404: Not found" />
      <Flexbox justifyContent="center">
        <H1>404: NOT FOUND</H1>
      </Flexbox>
    </Container>
  </Section>
);

export default NotFoundPage;
