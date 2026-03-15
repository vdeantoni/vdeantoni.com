import { getPosts } from "@/data";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts — Vinicius De Antoni",
  description: "Writing about software engineering, web development, and tools.",
};

export default async function Posts() {
  const posts = await getPosts();

  return (
    <section className="px-6 md:px-12 lg:px-20 pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Writing
        </span>
        <h1 className="mt-3 mb-4">Posts</h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-16">
          Thoughts on software engineering, web development, developer tools,
          and the occasional deep dive.
        </p>

        <div className="space-y-16 md:space-y-20">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
