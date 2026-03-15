import { getProjects } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Vinicius De Antoni",
  description: "A collection of side projects and experiments.",
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="px-6 md:px-12 lg:px-20 pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Work
        </span>
        <h1 className="mt-3 mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-16">
          Side projects, experiments, and creative explorations built in spare
          time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              className={cn(
                "group relative block overflow-hidden rounded-2xl bg-surface",
                index === 0 && "md:col-span-2",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  index === 0 ? "h-64 md:h-96" : "h-48 md:h-64",
                )}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, 600px"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h2
                      className={cn(
                        "text-white font-bold tracking-tight",
                        index === 0
                          ? "text-3xl md:text-4xl"
                          : "text-2xl md:text-3xl",
                      )}
                    >
                      {project.title}
                    </h2>
                    <p className="mt-2 text-white/70 max-w-md">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
