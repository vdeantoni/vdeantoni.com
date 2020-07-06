/** @jsx jsx */
import { jsx } from "theme-ui";

import useMetadata from "../hooks/use-metadata.js";
import { Container, Flex, Styled, Box } from "theme-ui";
import SocialLinks from "./social-links.jsx";
import NavLinks from "./nav-links.jsx";

const Footer = () => {
  const { title } = useMetadata();
  return (
    <Container sx={{ py: [8, 10, 12] }}>
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          justifyContent: "space-between",
        }}
      >
        <Styled.h2
          sx={{
            m: 0,
            fontSize: ["xl", "2xl", "3xl"],
          }}
        >
          {title}
        </Styled.h2>
        <NavLinks
          footer={true}
          gap={[4, 8]}
          sx={{
            my: [6, 0],
          }}
        />
        <SocialLinks />
      </Flex>
      <Box
        sx={{
          borderTopWidth: "1px",
          textAlign: "center",
          pt: [4, 5, 6],
          mt: [4, 5, 6],
        }}
      >
        <Styled.p
          sx={{
            fontSize: "sm",
            mt: "0",
          }}
        >
          © {new Date().getFullYear()}
        </Styled.p>
      </Box>
    </Container>
  );
};
export default Footer;
