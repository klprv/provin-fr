export type SidebarNode =
  | { type: "file"; name: string; href: string }
  | { type: "external"; name: string; href: string }
  | {
      type: "folder";
      name: string;
      defaultOpen?: boolean;
      children: SidebarNode[];
    };

export const sidebarTree: SidebarNode[] = [
  { type: "file", name: "README.md", href: "#readme" },
  {
    type: "folder",
    name: "publications",
    defaultOpen: true,
    children: [
      { type: "file", name: "2024_placeholder.md", href: "#publications" },
      { type: "file", name: "2023_placeholder.md", href: "#publications" },
    ],
  },
  {
    type: "folder",
    name: "projects",
    defaultOpen: true,
    children: [
      { type: "file", name: "placeholder.md", href: "#projects" },
    ],
  },
  { type: "file", name: "cv.md", href: "#cv" },
  { type: "file", name: "contact.md", href: "#contact" },
  {
    type: "folder",
    name: "external",
    defaultOpen: false,
    children: [
      {
        type: "external",
        name: "github.com/killianprovin",
        href: "https://github.com/killianprovin",
      },
      {
        type: "external",
        name: "scholar.google.com",
        href: "https://scholar.google.com",
      },
    ],
  },
];

export const sectionIds = [
  "readme",
  "publications",
  "projects",
  "cv",
  "contact",
] as const;
