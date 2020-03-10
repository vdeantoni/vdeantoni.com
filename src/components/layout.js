/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Logo from "../assets/svgs/logo.svg"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            path
          }
        }
      }
    }
  `)

  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="bg-gray-800 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Logo className="h-8 w-8 mr-4" />
            <h1 className="ty-h5 text-white text-shadow">
              {data.site.siteMetadata.title}
            </h1>
          </div>
          <nav className="hidden md:flex">
            <div className="ml-10 flex items-baseline">
              {data.site.siteMetadata.menuLinks.map(link => (
                //className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"

                <Link
                  key={link.name}
                  to={link.path}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${open ? "hidden" : "inline-flex"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${open ? "inline-flex" : "hidden"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav className={`${open ? "" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {data.site.siteMetadata.menuLinks.map(link => (
              //className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"

              <Link
                key={link.name}
                to={link.path}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>

      <footer className="bg-gray-200 h-8">
        <span>
          © {new Date().getFullYear()}, Built with {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
