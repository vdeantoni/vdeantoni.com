import cn from "classnames";
import React from "react";
import Layout from "../components/layout/layout";
import PostTeaser from "../components/post-teaser";
import Seo from "../components/seo.jsx";
import posts from "../data/posts.yml";

const PostsPage = () => {
  return (
    <Layout>
      <Seo title="Posts" description="A page with a list of all my public posts." />
      <h1 className={cn("font-extrabold")}>Posts</h1>

      <div className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}>
        {posts && posts.map((post, index) => <PostTeaser key={index} post={post} />)}
      </div>
    </Layout>
  );
};

export default PostsPage;
