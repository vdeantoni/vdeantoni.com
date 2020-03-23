module.exports = {
  siteMetadata: {
    title: `Vinicius De Antoni`,
    description: `Web site about the software engineer Vinicius De Antoni.`,
    siteUrl: `https://vdeantoni.com`,
    image: `http://gravatar.com/avatar/e59021f2412e79c4b5d5056ef9f712bc?s=400`,
    imageSecure: `http://gravatar.com/avatar/e59021f2412e79c4b5d5056ef9f712bc?s=400`,
    author: `@vinideantoni`,
    contactLinks: [
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
        link: "http://www.linkedin.com/in/vdeantoni",
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-76372620-1",
        head: true,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets\/svgs/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/assets/svgs/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-medium-feed`,
      options: {
        userName: `@vdeantoni`, // Medium user name
        name: `MediumFeed`, // GraphQL query AllMediumFeed
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require(`autoprefixer`),
          require(`cssnano`),
        ],
      },
    },
  ],
}
