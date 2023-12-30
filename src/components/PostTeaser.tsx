import cn from "classnames";
import format from "date-fns/format";
import Image from "next/image";
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const PostTeaserSkeleton = () => {
  return (
    <div className={"section-grid"}>
      <Skeleton className={cn("w-full", "h-40", "lg:h-60")} />
      <div className={cn("flex", "flex-col", "h-full")}>
        <div className={cn("h3", "mb-4")}>
          <Skeleton />
        </div>
        <div className={cn("mt-1")}>
          <Skeleton />
        </div>
        <div className={cn("flex", "flex-1", "items-end", "mt-2")}>
          <div className={cn("w-60")}>
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostTeaser: FC<{ post: any }> = ({ post }) => (
  <a href={post.link} className={cn("group", "block")} title={post.title}>
    <article>
      <div className={"section-grid"}>
        {post.image && (
          <div
            className={cn(
              "relative",
              "overflow-hidden",
              "w-full",
              "h-40",
              "lg:h-60",
              "group-hover:shadow-outline-angled",
              "actionable"
            )}
          >
            <Image
              loading="lazy"
              src={post.image}
              title={post.title}
              alt={post.title}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
        )}
        <div className={cn("flex", "flex-col", "items-start", "self-stretch")}>
          {post.title && (
            <h2
              className={cn(
                "h3",
                "mb-4",
                "text-primary",
                "group-hover:text-primaryHover",
                "actionable"
              )}
            >
              {post.title}
            </h2>
          )}
          {post.subtitle && (
            <p className={cn("mt-1", "text-text")}>{post.subtitle}</p>
          )}
          <div
            className={cn(
              "flex",
              "flex-1",
              "items-end",
              "text-text",
              "opacity-75",
              "mt-2"
            )}
          >
            {post.date && (
              <time dateTime={post.date}>
                {format(new Date(post.date), "MM/dd/yyyy")}
              </time>
            )}
            {post.timeToRead && (
              <span className={cn("ml-2")}> · {post.timeToRead} min read</span>
            )}
          </div>
        </div>
      </div>
    </article>
  </a>
);

export default PostTeaser;
