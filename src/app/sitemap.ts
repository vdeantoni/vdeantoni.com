import { MetadataRoute } from "next";
import { getPosts } from "@/data";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getPosts();

  const postUrls = posts.map(post => ({
    url: `https://vdeantoni.com${post.link}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: "https://vdeantoni.com",
      lastModified: new Date(),
    },
    {
      url: "https://vdeantoni.com/posts",
      lastModified: new Date(),
    },
    {
      url: "https://vdeantoni.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://vdeantoni.com/resume",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
};

export default sitemap;