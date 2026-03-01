import { promises as fs } from "fs";

export interface PostTag {
  name: string;
}

export interface Post {
  type: string;
  id: string;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  timeToRead: number;
  tags: PostTag[];
}

export interface Project {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface ResumeRole {
  type: "role";
  title: string;
  start: string;
  end: string | null;
  location: string;
  blurb: string;
  subItems?: string[];
}

export interface ResumeCompany {
  type: "company";
  name: string;
  slug: string;
  link: string;
  items: ResumeRole[];
}

export interface ResumeSchool {
  type: "school";
  name: string;
  slug: string;
  link: string;
  degree: string;
  field: string;
  blurb: string;
  start: string;
  end: string;
  location: string;
  publications?: { name: string; url: string; date: string }[];
}

export interface ResumeCertification {
  type: "certification";
  entity: string;
  technology: string;
  name: string;
  slug: string;
  link: string;
  date: string;
}

export type ResumeEntry = ResumeCompany | ResumeSchool | ResumeCertification;

export const getPosts = async (): Promise<Post[]> => {
  const file = await fs.readFile(process.cwd() + "/data/posts.json", "utf8");
  const data = JSON.parse(file);

  return data;
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const posts = await getPosts();
  return posts.find((post) => post.id === id) || null;
};

export const getPostContent = async (id: string): Promise<string | null> => {
  try {
    const content = await fs.readFile(
      process.cwd() + `/data/posts/${id}.md`,
      "utf8",
    );
    return content;
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return null;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  const file = await fs.readFile(
    process.cwd() + "/data/projects.json",
    "utf8",
  );
  const data = JSON.parse(file);

  return data;
};

export const getResume = async (): Promise<ResumeEntry[]> => {
  const file = await fs.readFile(process.cwd() + "/data/resume.json", "utf8");
  const data = JSON.parse(file);

  return data;
};
