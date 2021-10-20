import cn from "classnames";
import { format } from "date-fns";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import SectionGrid from "./styled/section-grid";

export const PostTeaser = ({ post, ...props }) => (
  <OutboundLink href={post.link} rel="noopener noreferrer" className={cn("group", "block")} title={post.title}>
    <article {...props}>
      <SectionGrid>
        {post.image && (
          <div className={cn("overflow-hidden", "group-hover:shadow-outline-angled", "actionable")}>
            <img
              loading="lazy"
              src={post.image}
              title={post.title}
              alt={post.title}
              className={cn("w-full", "h-40", "lg:h-60", "object-cover")}
            />
          </div>
        )}
        <div className={cn("flex", "flex-col", "items-start", "self-stretch")}>
          {post.title && (
            <h2 className={cn("h3", "mb-4", "text-primary", "group-hover:text-primaryHover", "actionable")}>
              {post.title}
            </h2>
          )}
          {post.subtitle && <p className={cn("mt-1", "text-text")}>{post.subtitle}</p>}
          <div className={cn("flex", "flex-1", "items-end", "text-text", "opacity-75")}>
            {post.date && <time dateTime={post.date}>{format(new Date(post.date), "MM/dd/yyyy")}</time>}
            {post.timeToRead && <span className={cn("ml-2")}> · {post.timeToRead} min read</span>}
          </div>
        </div>
      </SectionGrid>
    </article>
  </OutboundLink>
);

export default PostTeaser;
