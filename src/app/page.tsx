import Me from "@/components/Me";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPosts, getProjects } from "@/data";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

export default async function Home() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const latestPosts = posts.slice(0, 3);
  const latestProject = projects[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
            {/* Text content */}
            <div className="order-2 lg:order-1">
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Software Engineer
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-heading leading-[0.95] tracking-[-0.04em]">
                Vinicius
                <br />
                <span className="text-primary">De Antoni</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl leading-relaxed text-text max-w-xl opacity-80">
                Building robust back-end services and engaging user experiences
                for web, desktop, and mobile. Currently at{" "}
                <span className="text-heading font-semibold">Apple</span>,
                previously at{" "}
                <span className="text-heading font-semibold">Riot Games</span>,{" "}
                <span className="text-heading font-semibold">Blizzard</span>,
                and{" "}
                <span className="text-heading font-semibold">Amazon</span>.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View Resume
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <SocialLinks />
              </div>
            </div>

            {/* Profile image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <Me />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-border" />
        </div>
      </section>

      {/* Featured Project */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Featured
              </span>
              <h2 className="mt-2">Latest Project</h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              All projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Link href={latestProject.link} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-surface">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <Image
                  src={latestProject.image}
                  alt={latestProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                  {latestProject.title}
                </h3>
                <p className="mt-2 text-white/70 max-w-lg text-lg">
                  {latestProject.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  View project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/projects"
            className="md:hidden flex items-center gap-1 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            All projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Writing
              </span>
              <h2 className="mt-2">Latest Posts</h2>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              All posts
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} href={post.link} className="group block">
                <article>
                  <div className="relative h-48 overflow-hidden rounded-xl mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-3">
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{post.timeToRead} min</span>
                  </div>
                  <h3 className="text-xl font-semibold text-heading leading-snug group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.subtitle}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            About
          </span>
          <p className="mt-8 text-2xl md:text-3xl lg:text-4xl font-medium text-heading leading-snug tracking-tight">
            A versatile engineer whose journey spans{" "}
            <span className="text-primary">embedded software</span> to
            large-scale{" "}
            <span className="text-primary">e-commerce platforms</span>. Focused
            on <span className="text-primary">distributed systems</span> and{" "}
            <span className="text-primary">AI-driven development</span>, while
            channeling creativity into{" "}
            <span className="text-primary">music</span> and{" "}
            <span className="text-primary">soccer</span>.
          </p>
        </div>
      </section>
    </>
  );
}
