/** @jsx jsx */
import { jsx, Styled, Grid } from "theme-ui";

const { default: useMetadata } = require("../hooks/use-metadata");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const navLinkStyle = {
    color: "text",
    "&:hover": { color: "primary" },
  };

const SocialLinks = ({ ...props }) => {
    const { contactLinks } = useMetadata();
    return (
      <Grid columns="repeat(7, auto)" gap="1" {...props}>
        {contactLinks &&
          contactLinks.map((link) => (
            <Styled.a
              href={link.link}
              key={link.name}
              title={link.name}
              target="_blank"
              sx={{ mx: 2, ...navLinkStyle }}
            >
              <FontAwesomeIcon icon={link.icon} />
            </Styled.a>
          ))}
      </Grid>
    );
  };

  export default SocialLinks;