import { useStaticQuery, graphql } from "gatsby";

const useMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          contactLinks {
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

export default useMetadata;
