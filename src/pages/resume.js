import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import resume from "../content/resume.yml"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export const query = graphql`
  query {
    companies: allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "companies" }
      }
    ) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 64) {
            ...GatsbyImageSharpFluid
          }
        }
        name
      }
    }

    schools: allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "schools" }
      }
    ) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 64) {
            ...GatsbyImageSharpFluid
          }
        }
        name
      }
    }
  }
`

const plural = (num, words) => {
  num = Math.abs(num)
  num = num > 2 ? 2 : num
  return words[num]
}

const formatTimeDifference = (start, end) => {
  let result = ""

  const startDate = new Date(start)
  const endDate = end ? new Date(end) : new Date()

  const diff = Math.abs(endDate.getTime() - startDate.getTime())
  const diffMonths = Math.floor(diff / 1000 / 60 / 60 / 24 / 30)

  const years = Math.floor(diffMonths / 12)
  if (years) {
    result += `${years} ${plural(years, ["yrs", "yr", "yrs"])} `
  }

  const months = years ? Math.floor(diffMonths % years) : diffMonths
  if (months) {
    result += `${months} ${plural(months, ["mos", "mo", "mos"])} `
  }

  return result
}

const formatDate = (date, options) => {
  options = options || {
    year: "numeric",
    month: "short",
  }

  return new Intl.DateTimeFormat("en-US", options).format(
    date ? new Date(date) : new Date()
  )
}

const ResumePage = ({ data }) => {
  useEffect(() => {
    // console.log(resume)
    // console.log(data)
  })

  return (
    <Layout>
      <SEO title="Resume" />
      <section className="min-h-main-screen">
        <h1 className="ty-h1 my-12">Resume</h1>

        <h2 className="ty-h3 my-4 indent-2">Experience</h2>
        <ul className="p-8">
          {resume.companies.map(company => (
            <li
              key={company.name}
              className="flex flex-col sm:flex-row mb-10 pb-10 border-b last:mb-0 last:pb-0 last:border-none"
            >
              <div className="w-20 flex justify-center items-start flex-shrink-0">
                <Img
                  fluid={
                    data.companies.nodes.find(
                      node => node.name === company.image
                    ).childImageSharp.fluid
                  }
                  alt={`${company.name}'s logo`}
                  className="w-20 sticky top-0"
                  imgStyle={{ objectFit: "contain" }}
                ></Img>
              </div>
              <div className="mt-8 sm:mt-0 sm:ml-8">
                <h3 className="ty-h6">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {company.roles.length > 1 &&
                    formatTimeDifference(
                      company.roles[company.roles.length - 1].start,
                      company.roles[0].end
                    )}
                </p>

                <ul className="">
                  {company.roles.map((role, i) => (
                    <li
                      key={company.name + role.title + i}
                      className="mb-4 last:mb-0"
                    >
                      <h4 className="text-base font-semibold">{role.title}</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(role.start) +
                          ` – ` +
                          (role.end ? formatDate(role.end) : "Present")}
                        {` · ` + formatTimeDifference(role.start, role.end)}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {role.location}
                      </p>
                      <p className="text-sm mb-1">{role.blurb}</p>

                      <ul>
                        {role.items.map((item, j) => (
                          <li
                            key={company.name + role.title + i + j}
                            className="text-sm list-inside list-disc leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="ty-h3 my-4 indent-2">Education</h2>
        <ul className="p-8">
          {resume.schools.map(school => (
            <li
              key={school.name}
              className="flex flex-col sm:flex-row mb-10 pb-10 border-b last:mb-0 last:pb-0 last:border-none"
            >
              <div className="w-20 flex justify-center items-start flex-shrink-0">
                <Img
                  fluid={
                    data.schools.nodes.find(node => node.name === school.image)
                      .childImageSharp.fluid
                  }
                  alt={`${school.name}'s logo`}
                  className="w-20 sticky top-0"
                  imgStyle={{ objectFit: "contain" }}
                ></Img>
              </div>
              <div className="mt-8 sm:mt-0 sm:ml-8">
                <h3 className="ty-h6 mb-4">{school.name}</h3>
                <p className="text-base font-semibold">
                  {school.degree} – {school.field}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(school.start) +
                    ` – ` +
                    (school.end ? formatDate(school.end) : "Present")}
                </p>
                <p className="text-sm text-gray-600">{school.location}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="ty-h3 my-4 indent-2">Publications</h2>
        <ul className="p-8">
          {resume.publications.map(publication => (
            <li
              key={publication.name}
              className="flex flex-col sm:flex-row mb-10 pb-10 border-b last:mb-0 last:pb-0 last:border-none"
            >
              <div className="w-20 flex justify-center items-start flex-shrink-0"></div>
              <div className="ml-0 sm:ml-8">
                <h3 className="ty-h6">{publication.name}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(publication.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="ty-h3 my-4 indent-2">Certifications</h2>
        <ul className="p-8">
          {resume.certifications.map(certification => (
            <li
              key={certification.name}
              className="flex flex-col sm:flex-row mb-10 pb-10 border-b last:mb-0 last:pb-0 last:border-none"
            >
              <div className="w-20 flex justify-center items-start flex-shrink-0"></div>
              <div className="ml-0 sm:ml-8">
                <h3 className="ty-h6">{certification.name}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(certification.date, {
                    year: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default ResumePage
