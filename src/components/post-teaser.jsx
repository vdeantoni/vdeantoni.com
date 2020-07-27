import * as $ from "classnames";
import { format } from "date-fns";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import SectionGrid from "./styled/section-grid";

export const PostTeaser = ({ post, ...props }) => (
  <OutboundLink href={post.link} rel="noopener noreferrer" className={$("group")} title={post.title}>
    <article {...props}>
      <SectionGrid>
        {post.image && (
          <div className={$("block", "overflow-hidden", "group-hover:shadow-outline-angled", "actionable")}>
            <img
              loading="lazy"
              src={post.image}
              title={post.title}
              alt={post.title}
              className={$("h-full", "object-none")}
            />
          </div>
        )}
        <div className={$("flex", "flex-col", "items-start", "self-stretch")}>
          {post.title && (
            <h2 className={$("h3", "mb-4", "text-primary", "group-hover:text-primaryHover", "actionable")}>
              {post.title}
            </h2>
          )}
          {post.subtitle && <p className={$("mt-1", "text-text")}>{post.subtitle}</p>}
          <div className={$("flex", "flex-1", "items-end", "text-text", "opacity-75")}>
            {post.date && <time dateTime={post.date}>{format(new Date(post.date), "MM/dd/yyyy")}</time>}
            {post.timeToRead && <span className={$("ml-2")}> - {post.timeToRead} min read</span>}
          </div>
        </div>
      </SectionGrid>
    </article>
  </OutboundLink>
);

export default PostTeaser;
