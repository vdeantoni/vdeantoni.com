import {
  Award,
  Briefcase,
  GraduationCap,
  Download,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import {
  getResume,
  type ResumeCompany,
  type ResumeSchool,
  type ResumeCertification,
} from "@/data";
import { cn } from "@/lib/utils";
import { formatISO, addYears } from "date-fns";
import Timeline from "@/components/Timeline";
import { formatDate, formatTimeDifference } from "@/utils/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Vinicius De Antoni",
  description: "Employment, education, and certification history.",
};

const timeDifference = (
  periods: { start: string; end: string | null }[],
): string => {
  if (!periods || periods.length < 1) return "";
  return formatTimeDifference(periods.at(-1)!.start, periods.at(0)!.end!);
};

const timePeriod = (start: string, end: string | null): string =>
  `${formatDate(start)} - ${end ? formatDate(end) : "Present"}`;

const SectionTitle = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center gap-3 mt-20 mb-10">
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h2 className="text-3xl md:text-4xl">{title}</h2>
  </div>
);

const EntryTitle = ({
  title,
  subTitle,
  slug,
  link,
}: {
  title: string;
  subTitle?: string;
  slug: string;
  link?: string;
}) => (
  <div className="flex flex-col md:items-end md:sticky top-24">
    <h3 id={slug} className="text-xl font-semibold text-heading tracking-tight">
      {link ? (
        <a
          href={link}
          className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          {title}
          <ExternalLink className="w-3.5 h-3.5 opacity-40" />
        </a>
      ) : (
        title
      )}
    </h3>
    {subTitle && (
      <span className="text-sm text-muted-foreground mt-1">{subTitle}</span>
    )}
  </div>
);

const EntryItem = ({
  title,
  start,
  end,
  location,
  blurb,
  subItems,
  links,
}: {
  title: string;
  start: string;
  end: string | null;
  location?: string;
  blurb?: string;
  subItems?: string[];
  links?: { name: string; url: string }[];
}) => (
  <div className="relative pl-6 pb-8 last:pb-0 border-l border-border/60">
    {/* Timeline dot */}
    <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-primary -translate-x-[calc(50%+0.5px)]" />
    <div className="text-lg font-medium text-heading">{title}</div>
    <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-1">
      <span>{timePeriod(start, end)}</span>
      {location && <span>{location}</span>}
    </div>
    {blurb && (
      <p className="mt-3 text-text leading-relaxed">{blurb}</p>
    )}
    {subItems && subItems.length > 0 && (
      <ul className="mt-3 space-y-1.5">
        {subItems.map((subItem, i) => (
          <li
            key={i}
            className="text-sm text-text leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
          >
            {subItem}
          </li>
        ))}
      </ul>
    )}
    {links?.map((link, i) => (
      <a
        key={i}
        href={link.url}
        className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
      >
        {link.name}
        <ExternalLink className="w-3 h-3" />
      </a>
    ))}
  </div>
);

export default async function Resume() {
  const resume = await getResume();

  const companies = resume.filter(
    (e): e is ResumeCompany => e.type === "company",
  );
  const schools = resume.filter(
    (e): e is ResumeSchool => e.type === "school",
  );
  const certifications = resume.filter(
    (e): e is ResumeCertification => e.type === "certification",
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Experience
            </span>
            <h1 className="mt-3">Resume</h1>
          </div>
          <a
            href="/resume.pdf"
            download="vdeantoni-resume.pdf"
            title="Download Resume as PDF"
            className={cn(
              "inline-flex items-center gap-2 mt-6 md:mt-0",
              "px-5 py-2.5 rounded-full text-sm font-medium",
              "bg-foreground text-background hover:opacity-90",
              "transition-opacity no-print",
            )}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        {/* Timeline */}
        <div className="hidden md:block">
          <div className="bg-surface border border-border rounded-2xl p-6 overflow-x-auto no-scrollbar">
            <Timeline data={resume} />
          </div>
        </div>

        {/* Employment */}
        <SectionTitle title="Employment" icon={Briefcase} />
        <div className="space-y-16">
          {companies.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12"
            >
              <EntryTitle
                title={entry.name}
                slug={entry.slug}
                link={entry.link}
                subTitle={timeDifference(entry.items)}
              />
              <div className="space-y-0">
                {entry.items?.map((item, j) => (
                  <EntryItem
                    key={j}
                    title={item.title}
                    start={item.start}
                    end={item.end}
                    location={item.location}
                    blurb={item.blurb}
                    subItems={item.subItems}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <SectionTitle title="Education" icon={GraduationCap} />
        <div className="space-y-16">
          {schools.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12"
            >
              <EntryTitle title={entry.name} slug={entry.slug} link={entry.link} />
              <div>
                <EntryItem
                  title={`${entry.degree} in ${entry.field}`}
                  start={entry.start}
                  end={entry.end}
                  location={entry.location}
                  blurb={entry.blurb}
                  links={entry.publications}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <SectionTitle title="Certifications" icon={Award} />
        <div className="space-y-16">
          {certifications.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12"
            >
              <EntryTitle
                title={entry.entity}
                slug={entry.slug}
                link={entry.link}
              />
              <div>
                <EntryItem
                  title={entry.name}
                  start={entry.date}
                  end={formatISO(addYears(new Date(entry.date), 1))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
