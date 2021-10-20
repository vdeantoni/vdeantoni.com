import cn from "classnames";
import React from "react";
import Layout from "../components/layout/layout";
import PostTeaser from "../components/post-teaser";
import Seo from "../components/seo.jsx";
import projects from "../data/projects.yml";

const ProjectsPage = () => {
  return (
    <Layout>
      <Seo title="Projects" description="A page with a list of all my side projects." />
      <h1 className={cn("font-extrabold")}>Projects</h1>

      <div className={cn("grid", "grid-cols-1", "gap-10", "md:gap-20", "mt-10")}>
        {projects?.map((project, index) => <PostTeaser key={index} post={project} />)}
      </div>
    </Layout>
  );
};

export default ProjectsPage;
