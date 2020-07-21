import * as $ from "classnames";
import { format } from "date-fns";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import SectionGrid from "./styled/section-grid";

export const PostTeaser = ({ post, ...props }) => (
  <article {...props}>
    <SectionGrid>
      {post.image && (
        <OutboundLink href={post.link} rel="noopener noreferrer" className={$("block", "overflow-hidden")}>
          <img src={post.image} title={post.title} alt={post.title} className={$("h-full", "object-none")} />
        </OutboundLink>
      )}
      <div className={$("flex", "flex-col", "items-start", "self-stretch")}>
        {post.title && (
          <h2 className={$("h3", "mb-4")}>
            <OutboundLink href={post.link} rel="noopener noreferrer" className={$("block", "overflow-hidden")}>
              {post.title}
            </OutboundLink>
          </h2>
        )}
        {post.subtitle && <p className={$("mt-1")}>{post.subtitle}</p>}
        <div className={$("flex", "flex-1", "items-end")}>
          {post.date && <time dateTime={post.date}>{format(new Date(post.date), "MM/dd/yyyy")}</time>}
          {post.timeToRead && <span className={$("ml-2")}> - {post.timeToRead} min read</span>}
        </div>
      </div>
    </SectionGrid>
  </article>
);

export default PostTeaser;
