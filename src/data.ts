import { promises as fs } from "fs";

export const getPosts = async (): Promise<any[]> => {
  const file = await fs.readFile(process.cwd() + "/data/posts.json", "utf8");
  const data = JSON.parse(file);

  return data;
};

export const getPostById = async (id: string): Promise<any | null> => {
  const posts = await getPosts();
  return posts.find(post => post.id === id) || null;
};

export const getPostContent = async (id: string): Promise<string | null> => {
  try {
    const content = await fs.readFile(process.cwd() + `/data/posts/${id}.md`, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return null;
  }
};

export const getProjects = async (): Promise<any[]> => {
  const file = await fs.readFile(process.cwd() + "/data/projects.json", "utf8");
  const data = JSON.parse(file);

  return data;
};

export const getResume = async (): Promise<any[]> => {
  const file = await fs.readFile(process.cwd() + "/data/resume.json", "utf8");
  const data = JSON.parse(file);

  return data;
};
