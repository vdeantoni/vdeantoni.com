require(`dotenv`).config();

const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: "vdeantoni.com",
    description: "Web site about the software engineer Vinicius De Antoni",
    siteUrl: process.env.SITE_URL || "https://vdeantoni.com",
    image: `http://gravatar.com/avatar/e59021f2412e79c4b5d5056ef9f712bc?s=400`,
    imageSecure: `http://gravatar.com/avatar/e59021f2412e79c4b5d5056ef9f712bc?s=400`,
    author: `@vinideantoni`,
    navLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Posts",
        link: "/posts",
      },
      {
        name: "Resume",
        link: "/resume",
      },
    ],
    socialLinks: [
      {
        name: "Email",
        link: "mailto:admin@vdeantoni.com",
        icon: ["fas", "envelope"],
      },
      {
        name: "LinkedIn",
        link: "http://www.linkedin.com/in/vdeantoni",
        icon: ["fab", "linkedin"],
      },
      {
        name: "Medium",
        link: "https://medium.com/@vdeantoni",
        icon: ["fab", "medium"],
      },
      {
        name: "Stack Overflow",
        link: "http://stackoverflow.com/users/621767/deantoni?tab=profile",
        icon: ["fab", "stack-overflow"],
      },
      {
        name: "Github",
        link: "https://github.com/vdeantoni",
        icon: ["fab", "github"],
      },
      {
        name: "Facebook",
        link: "http://facebook.com/vinideantoni",
        icon: ["fab", "facebook"],
      },
      {
        name: "Twitter",
        link: "http://twitter.com/vinideantoni",
        icon: ["fab", "twitter"],
      },
    ],
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vinicius De Antoni`,
        short_name: `vdeantoni`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/.*\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-76372620-1",
      },
    },
  ],
};
