import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: any }) => (
  <Link
    href={`${post.link}`}
    className={cn("group", "block")}
    title={post.title}
  >
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
              "actionable",
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
              className={cn("transform group-hover:scale-105 duration-300")}
            />
          </div>
        )}
        <div className={cn("flex", "flex-col", "items-start", "self-stretch")}>
          {post.title && (
            <h2
              className={cn(
                "h3",
                "mb-4",
                "text-text",
                "actionable",
                "transition-all",
                "duration-300",
                "ease-in-out",
                "group-hover:text-primary",
                "group-hover:translate-x-1",
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
              "mt-2",
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
  </Link>
);

export default PostCard;
