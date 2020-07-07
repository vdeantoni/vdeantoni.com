import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          navLinks {
            link
            name
          }
          socialLinks {
            icon
            link
            name
          }
          description
          image
          imageSecure
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
