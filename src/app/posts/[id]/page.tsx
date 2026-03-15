import { getPostById, getPosts, getPostContent, type PostTag } from "@/data";
import { markdownToHtml } from "@/utils/markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Vinicius De Antoni`,
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
  const [post, markdownContent] = await Promise.all([
    getPostById(id),
    getPostContent(id),
  ]);

  if (!post || !markdownContent) {
    notFound();
  }

  const htmlContent = await markdownToHtml(markdownContent);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Hero image */}
      {post.image && (
        <div className="relative w-full h-64 md:h-[28rem] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Back link */}
        <Link
          href="/posts"
          className={cn(
            "inline-flex items-center gap-2 text-sm text-muted-foreground",
            "hover:text-heading transition-colors mt-8 mb-10",
          )}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-[1.05] tracking-[-0.03em]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
              {post.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-8 pb-8 border-b border-border">
            {post.date && (
              <time
                dateTime={post.date}
                className="text-sm font-mono text-muted-foreground"
              >
                {formatDate(post.date, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.timeToRead && (
              <span className="text-sm font-mono text-muted-foreground">
                {post.timeToRead} min read
              </span>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-auto">
                {post.tags.map((tag: PostTag, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs font-mono"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className={cn(
            "prose-editorial",
            "[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-heading [&>h1]:mt-12 [&>h1]:mb-6",
            "[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-heading [&>h2]:mt-10 [&>h2]:mb-5",
            "[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-heading [&>h3]:mt-8 [&>h3]:mb-4",
            "[&>p]:text-text [&>p]:leading-[1.8] [&>p]:mb-5",
            "[&>a]:text-primary [&>a]:hover:text-primary-hover [&>a]:underline [&>a]:underline-offset-2",
            "[&>ul]:my-5 [&>ul]:space-y-2 [&>ul]:ml-6 [&>ul]:list-disc",
            "[&>ol]:my-5 [&>ol]:space-y-2 [&>ol]:ml-6 [&>ol]:list-decimal",
            "[&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-muted-foreground",
            "[&>hr]:border-border [&>hr]:my-12",
            "[&>img]:rounded-xl [&>img]:my-8",
            "[&>pre]:rounded-xl [&>pre]:my-6 [&>pre]:overflow-x-auto",
          )}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}
