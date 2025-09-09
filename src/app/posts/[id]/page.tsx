import { getPostById, getPosts, getPostContent } from "@/data";
import { markdownToHtml } from "@/utils/markdown";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | vdeantoni.com`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const markdownContent = await getPostContent(id);

  if (!markdownContent) {
    notFound();
  }

  const htmlContent = await markdownToHtml(markdownContent);

  return (
    <article className={cn("max-w-5xl", "mx-auto")}>
      {/* Header */}
      <header className={cn("mb-8")}>
        <div className={cn("mb-4")}>
          <Link
            href="/posts"
            className={cn(
              "text-primary",
              "hover:text-primary-hover",
              "transition-colors",
              "duration-200",
            )}
          >
            ← Back to Posts
          </Link>
        </div>

        {post.image && (
          <>
            <div
              className={cn(
                "absolute",
                "left-0",
                "w-screen",
                "h-64",
                "md:h-80",
                "overflow-hidden",
                "shadow-lg",
              )}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={cn("object-cover")}
                priority
              />
            </div>
            <div className={cn("h-64", "md:h-80", "mb-6")} />
          </>
        )}

        <h1
          className={cn(
            "relative",
            "text-4xl",
            "md:text-5xl",
            "font-bold",
            "mb-4",
            "text-primary",
          )}
        >
          {post.title}
        </h1>

        {post.subtitle && (
          <p className={cn("text-xl", "text-text", "opacity-80", "mb-6")}>
            {post.subtitle}
          </p>
        )}

        <div
          className={cn(
            "flex",
            "flex-wrap",
            "items-center",
            "gap-4",
            "text-text",
            "opacity-75",
          )}
        >
          {post.date && (
            <time dateTime={post.date} className={cn("text-sm")}>
              {format(new Date(post.date), "MMMM dd, yyyy")}
            </time>
          )}

          {post.timeToRead && (
            <span className={cn("text-sm")}>{post.timeToRead} min read</span>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className={cn("flex", "flex-wrap", "gap-2")}>
              {post.tags.map((tag: any, index: number) => (
                <span
                  key={index}
                  className={cn(
                    "px-2",
                    "py-1",
                    "text-xs",
                    "bg-background-accent",
                    "text-text",
                    "rounded-full",
                    "border",
                    "border-border",
                  )}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={cn("prose", "prose-lg", "max-w-none", "mb-8")}>
        <div
          className={cn(
            "text-text",
            "[&>h1]:text-primary",
            "[&>h2]:text-primary",
            "[&>h3]:text-primary",
            "[&>a]:text-primary",
            "[&>a]:hover:text-primary-hover",
          )}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}
