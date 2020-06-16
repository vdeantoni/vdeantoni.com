import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import React from "react"

export const MediumCard = ({ post }) => {
  return (
    <OutboundLink
      className="flex flex-col md:flex-row ty-link"
      href={post.link}
      target="_blank"
    >
      <div className="flex-shrink-0">
        <img
          src={post.images.mobile}
          alt="Publication thumbnail"
          className="object-cover md:hidden"
          style={{ width: 768, height: 128 }}
        ></img>
        <img
          src={post.images.desktop}
          alt="Publication thumbnail"
          className="object-cover hidden md:block"
          style={{ width: 128, height: 128 }}
        ></img>
      </div>
      <div className="flex-1 flex flex-col md:ml-4">
        <h4 className="mt-1 md:mt-0 mb-1">
          <FontAwesomeIcon icon={["fab", "medium"]} className="mr-1" />
          Medium
        </h4>
        <h3 className="font-bold leading-tight">{post.title}</h3>
        <p className="text-sm opacity-75">{post.subtitle}</p>
        <div className="mt-2 md:mt-0 flex flex-grow  md:justify-around items-end flex-no-wrap">
          {(post.tags || []).map((tag) => (
            <div
              key={`tag-${tag.name}`}
              className="text-2xs md:text-xs font-thin border-gray-300 rounded border-solid border mr-1 md:mr-0 p-1 whitespace-no-wrap"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </OutboundLink>
  )
}
