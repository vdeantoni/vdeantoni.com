import Me from "@/components/Me";
import Link from "next/link";
import cn from "classnames";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPosts, getProjects } from "@/data";
import PostCard from "@/components/PostCard";

const LatestProject = async () => {
  const project = await getProjects();

  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "gap-8",
        "md:gap-12",
        "lg:gap-16",
        "items-center",
        "mt-10",
      )}
    >
      <PostCard post={project[0]} />
    </div>
  );
};

const LatestPost = async () => {
  const posts = await getPosts();

  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "gap-8",
        "md:gap-12",
        "lg:gap-16",
        "items-center",
        "mt-10",
      )}
    >
      <PostCard post={posts[0]} />
    </div>
  );
};

export default async function Home() {
  return (
    <>
      <div
        className={cn(
          "grid",
          "grid-cols-1",
          "md:grid-cols-2",
          "gap-8",
          "md:gap-12",
          "md:gap-16",
        )}
      >
        <Me />
        <div
          className={cn("flex", "flex-col", "items-center", "md:items-start")}
        >
          <h1 className={cn("font-extrabold")}>Hello,</h1>

          <p className={cn("text-lg", "leading-loose", "mt-10")}>
            My name is Vinicius De Antoni, and I am a generalist software
            engineer experienced in developing back-end services for web,
            desktop and mobile applications as well as building user experiences
            with web technologies.
          </p>
          <p className={cn("text-lg", "leading-loose", "mt-4")}>
            Throughout my career, I&apos;ve worked with several different
            technologies in a variety of problem spaces. From embedded software
            for printers to a costumer support system, from e-commerce platforms
            to desktop applications.
          </p>
          <p className={cn("text-lg", "leading-loose", "mt-4")}>
            Motivated and eager for knowledge, I am very interested in customer
            facing applications and distributed systems, and I also have passion
            for game development, artificial intelligence and music.
          </p>
        </div>
      </div>

      <h2 className={cn("h3", "mt-20")}>Most recent project</h2>

      <LatestProject />

      <div className={cn("flex", "justify-end")}>
        <Link href={"/projects"}>
          <button className={cn("button", "mt-6", "group")}>
            View all projects
            <FontAwesomeIcon
              icon={faArrowRight}
              className={cn(
                "ml-2",
                "w-4",
                "group-hover:translate-x-1.5",
                "transition",
              )}
            />
          </button>
        </Link>
      </div>

      <h2 className={cn("h3", "mt-10")}>Latest post</h2>

      <LatestPost />

      <div className={cn("flex", "justify-end")}>
        <Link href={"/posts"}>
          <button className={cn("button", "mt-6", "group")}>
            View all posts
            <FontAwesomeIcon
              icon={faArrowRight}
              className={cn(
                "ml-2",
                "w-4",
                "group-hover:translate-x-1.5",
                "transition",
              )}
            />
          </button>
        </Link>
      </div>
    </>
  );
}
