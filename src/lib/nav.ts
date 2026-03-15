export interface NavLink {
  name: string;
  link: string;
}

export const navLinks: NavLink[] = [
  { name: "Home", link: "/" },
  { name: "Posts", link: "/posts" },
  { name: "Projects", link: "/projects" },
  { name: "Resume", link: "/resume" },
];
