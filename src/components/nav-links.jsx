/** @jsx jsx */
import { Link } from "gatsby";
import { Grid, jsx, Styled } from "theme-ui";

const { default: useMetadata } = require("../hooks/use-metadata");

const navLinkStyle = {
  color: "text",
  "&:hover": { color: "primary" },
};

const NavLinks = ({ footer = false, ...props }) => {
  const { navLinks } = useMetadata();
  return (
    <Grid columns={["1", "repeat(3,auto)"]} gap={[0, 6, 8]} {...props}>
      {navLinks &&
        navLinks.map((link) => (
          <Styled.a
            as={Link}
            key={link.name}
            to={link.link}
            title={link.name}
            activeClassName="active"
            sx={{
              py: footer ? 0 : 3,
              borderBottomWidth: footer ? null : ["1px", 0],
              fontSize: "md",
              "&.active": {
                color: "primary",
              },
              ...navLinkStyle,
            }}
          >
            {link.name}
          </Styled.a>
        ))}
    </Grid>
  );
};

export default NavLinks;
