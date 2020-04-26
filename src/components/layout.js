/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, useStaticQuery } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import React from "react"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          siteUrl
          menuLinks {
            name
            path
          }
          contactLinks {
            name
            link
            icon
          }
        }
      }
    }
  `)

  return (
    <>
      <Header
        title={data.site.siteMetadata.title}
        siteUrl={data.site.siteMetadata.siteUrl}
        contactLinks={data.site.siteMetadata.contactLinks}
        menuLinks={data.site.siteMetadata.menuLinks}
      />

      <main>{children}</main>

      <footer className="relative flex items-center justify-center bg-gray-200 dark:bg-gray-800 h-16 px-8">
        <div className="flex flex-1 justify-center">
          {data.site.siteMetadata.contactLinks.map((link) => (
            <OutboundLink
              key={link.name}
              title={link.name}
              href={link.link}
              className="ty-link mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={link.icon} />
            </OutboundLink>
          ))}
        </div>
        <div className="absolute right-0 pr-8 text-xs">
          © {new Date().getFullYear()}
        </div>
      </footer>
    </>
  )
}

export default Layout
