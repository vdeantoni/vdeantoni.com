import cn from "classnames";
import Head from "next/head";
import React, { FC } from "react";
import PostTeaser from "../components/PostTeaser";
import posts from "../data/posts.yml";

export const getStaticProps = () => {
  return {
    props: {
      POSTS: posts,
    },
  };
};

const PostsPage: FC<{ POSTS: any[] }> = ({ POSTS }) => {
  return (
    <>
      <Head>
        <title>vdeantoni.com | Posts</title>
        <meta
          name="description"
          content="A page with a list of all my public posts."
        />
      </Head>
      <h1 className={cn("font-extrabold")}>Posts</h1>

      <div
        className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}
      >
        {POSTS.map((post, index) => (
          <PostTeaser key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsPage;
