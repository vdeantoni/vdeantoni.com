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
          <h1 className={cn("font-extrabold")}>Hello</h1>

          <p className={cn("text-xl", "leading-loose", "mt-10")}>
            I&apos;m{" "}
            <span
              className={cn(
                "font-bold",
                "text-xl",
                "bg-gradient-to-br from-text to-secondary bg-clip-text text-transparent",
              )}
            >
              Vinicius De Antoni
            </span>
            , a versatile software engineer. I build everything from robust{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              back-end services
            </span>{" "}
            to engaging{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              user experiences
            </span>{" "}
            for web, desktop, and mobile.
          </p>

          <p className={cn("text-xl", "leading-loose", "mt-4")}>
            My journey has taken me through diverse problem spaces, ranging from{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              embedded software
            </span>{" "}
            to large-scale{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              e-commerce platforms
            </span>
            . While my professional focus is on{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              distributed systems
            </span>{" "}
            and{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              AI-driven development
            </span>
            , I channel that same appreciation for flow and strategy into creating{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              music
            </span>{" "}
            and watching{" "}
            <span
              className={cn(
                "font-semibold",
                "font-medium transition-colors duration-300 border-b-2 border-transparent pb-[1px] hover:border-text",
              )}
            >
              soccer
            </span>
            .
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
