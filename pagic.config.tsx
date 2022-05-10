import { React } from "https://deno.land/x/pagic/mod.ts";

export default {
  srcDir: "src",
  title: "Drizzle's Blog",
  theme: "blog",
  plugins: ["blog"],
  exclude: ["dist"],
  head: (
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍞</text></svg>"
    />
  ),
  nav: [
    {
      text: "Home",
      link: "/",
      icon: "czs-home-l",
    },
    {
      text: "Tags",
      link: "/tags/",
      icon: "czs-tag-l",
    },
    {
      text: "Archives",
      link: "/archives/",
      icon: "czs-category-l",
    },
    {
      text: "About",
      link: "https://github.com/drizzlesconsin",
      target: "_blank",
      icon: "czs-about-l",
    },
  ],
  blog: {
    isPost: true,
    root: "/posts/",
    social: {
      github: "drizzlesconsin",
      email: "ZHJpenpsZXNjb25zaW5AZ21haWwuY29t",
      twitter: "#",
    },
  },
};
