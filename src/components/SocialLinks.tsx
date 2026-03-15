import {
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { type ComponentType } from "react";
import { StackOverflowIcon } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SocialLink = {
  name: string;
  link: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
};

const socialLinks: SocialLink[] = [
  { name: "Email", link: "mailto:admin@vdeantoni.com", icon: Mail },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/vdeantoni",
    icon: Linkedin,
  },
  {
    name: "Stack Overflow",
    link: "https://stackoverflow.com/users/621767/deantoni?tab=profile",
    icon: StackOverflowIcon,
  },
  { name: "Github", link: "https://github.com/vdeantoni", icon: Github },
  {
    name: "Twitter",
    link: "https://twitter.com/vinideantoni",
    icon: Twitter,
  },
];

const SocialLinks = ({ className = "" }: { className?: string }) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1", className)}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <a
                  href={link.link}
                  className={cn(
                    "p-2 rounded-full text-muted-foreground",
                    "hover:text-heading hover:bg-surface",
                    "transition-all duration-200",
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SocialLinks;
