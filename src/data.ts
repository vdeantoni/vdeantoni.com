import { promises as fs } from "fs";

export const getPosts = async (): Promise<any[]> => {
  const file = await fs.readFile(process.cwd() + "/data/posts.json", "utf8");
  const data = JSON.parse(file);

  return data;
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
