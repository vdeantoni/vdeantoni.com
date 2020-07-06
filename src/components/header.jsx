/** @jsx jsx */
import { jsx, Styled, Button, useColorMode } from "theme-ui";
import useMetadata from "../../src/hooks/use-metadata.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/logo.svg";
import { useState } from "react";
import { Container, Flex, Box } from "theme-ui";
import SocialLinks from "./social-links.jsx";
import NavLinks from "./nav-links.jsx";

const Branding = () => {
  const { title } = useMetadata();
  return (
    <Styled.a
      href="/"
      sx={{ fontSize: "2xl", fontWeight: "semibold", color: "text" }}
    >
      <Logo width="32px" height="32px" />
      <span sx={{ ml: 4 }}>{title}</span>
    </Styled.a>
  );
};

const ModeToggle = ({ ...props }) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Button
      variant="icon"
      onClick={() => setColorMode(colorMode === "default" ? "dark" : "default")}
      sx={{ ml: [2], ...navLinkStyle }}
      {...props}
    >
      <FontAwesomeIcon
        icon={colorMode === "default" ? ["fas", "sun"] : ["fas", "moon"]}
      />
    </Button>
  );
};

const navLinkStyle = {
  color: "text",
  "&:hover": { color: "primary" },
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box
      sx={{
        position: ["sticky", "relative"],
        top: "0",
        bg: "background",
        zIndex: "1000",
      }}
    >
      <Container>
        <Flex
          sx={{
            display: ["none", "flex"],
            justifyContent: "space-between",
            alignItems: "center",
            py: "1",
          }}
        >
          <Branding />
          <NavLinks sx={{ ml: [null, 8, 12] }} />
          <SocialLinks
            sx={{
              ml: "auto",
              mr: "4",
              borderRightWidth: "1px",
              pr: "4",
              display: ["none", "none", "block"],
            }}
          />
          <ModeToggle sx={{ ml: "0" }} />
        </Flex>
      </Container>
      <Flex
        sx={{
          display: ["flex", "none"],
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex
          sx={{
            width: "full",
            justifyContent: "space-between",
            alignItems: "center",
            pl: "4",
            pr: "1",
            visibility: showMenu ? "hidden" : "visible",
            transition: "all .15s ease-in",
          }}
        >
          <Branding />
          <Button
            variant="link"
            sx={{ outline: "none", py: 3, px: 4 }}
            onClick={() => setShowMenu(true)}
          >
            <FontAwesomeIcon icon={["fas", "bars"]} size="2x" />
          </Button>
        </Flex>
        <Box
          sx={{
            position: "absolute",
            zIndex: "1000",
            bg: "background",
            top: "4",
            left: "4",
            right: "4",
            px: "4",
            borderRadius: "xl",
            overflow: "scroll",
            boxShadow: "3xl",
            border: "1px solid",
            borderColor: "border",
            transform: `scale(${showMenu ? 1 : 0.95})`,
            visibility: showMenu ? "visible" : "hidden",
            opacity: showMenu ? 1 : 0,
            transition: "all .25s ease-in",
            transformOrigin: "100% 0",
            maxHeight: "95vh",
          }}
        >
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "full",
              py: "2",
              px: "0",
            }}
          >
            <Branding />
            <Button variant="link" onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon={["fas", "times"]} size="2x" />
            </Button>
          </Flex>
          <NavLinks sx={{ borderTopWidth: "1px" }} />
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              py: "4",
            }}
          >
            <SocialLinks />
            <ModeToggle ml="auto" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
