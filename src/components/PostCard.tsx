import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/utils/date";

interface PostCardProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  date?: string;
  timeToRead?: number;
}

const PostCard = ({ post }: { post: PostCardProps }) => (
  <Link href={post.link} className="group block" title={post.title}>
    <article className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-10 items-start">
      {post.image && (
        <div className="relative h-48 md:h-64 overflow-hidden rounded-xl">
          <Image
            loading="lazy"
            src={post.image}
            title={post.title}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 500px"
            className="transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
          {post.date && (
            <time dateTime={post.date}>
              {formatDate(post.date, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
          {post.timeToRead && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{post.timeToRead} min read</span>
            </>
          )}
        </div>
        <h2
          className={cn(
            "text-2xl md:text-3xl font-semibold text-heading leading-snug tracking-tight",
            "group-hover:text-primary transition-colors duration-200",
          )}
        >
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">
            {post.subtitle}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
          Read more
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  </Link>
);

export default PostCard;
