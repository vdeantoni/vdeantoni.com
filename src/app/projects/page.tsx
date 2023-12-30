import { getProjects } from "@/data";
import cn from "classnames";
import PostTeaser from "@/components/PostTeaser";

export const metadata: Metadata = {
  title: "vdeantoni.com | Projects",
  description: "A page with a list of some of my side projects.",
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <h1 className={cn("font-extrabold")}>Projects</h1>

      <div
        className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}
      >
        {projects.map((project, index) => (
          <PostTeaser key={index} post={project} />
        ))}
      </div>
    </>
  );
}
