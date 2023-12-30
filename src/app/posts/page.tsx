import { getPosts } from "@/data";
import cn from "classnames";
import PostTeaser, { PostTeaserSkeleton } from "@/components/PostTeaser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "vdeantoni.com | Posts",
  description: "A page with a list of all my public posts.",
};

export default async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <h1 className={cn("font-extrabold")}>Posts</h1>

      <div
        className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}
      >
        {posts.map((post, index) => (
          <PostTeaser key={index} post={post} />
        ))}
      </div>
    </>
  );
}
