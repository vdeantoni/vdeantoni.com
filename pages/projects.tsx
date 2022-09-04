import cn from "classnames";
import Head from "next/head";
import React, { FC } from "react";
import PostTeaser from "../components/PostTeaser";
import projects from "../data/projects.yml";

export const getStaticProps = () => {
  return {
    props: {
      PROJECTS: projects,
    },
  };
};

const ProjectsPage: FC<{ PROJECTS: any[] }> = ({ PROJECTS }) => {
  return (
    <>
      <Head>
        <title>vdeantoni.com | Projects</title>
        <meta
          name="description"
          content="A page with a list of all my side projects."
        />
      </Head>
      <h1 className={cn("font-extrabold")}>Projects</h1>

      <div
        className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}
      >
        {PROJECTS.map((project, index) => (
          <PostTeaser key={index} post={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
