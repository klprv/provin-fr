"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import type { MouseEvent } from "react";

interface SidebarItemProps {
  name: string;
  href: string;
  active: boolean;
  depth: number;
  external?: boolean;
  onSelect: (href: string) => void;
}

export default function SidebarItem({
  name,
  href,
  active,
  depth,
  external = false,
  onSelect,
}: SidebarItemProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!external) event.preventDefault();
    onSelect(href);
  };

  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={active ? "true" : undefined}
      className={`flex items-center gap-2 py-1 pr-3 ${
        active
          ? "bg-[#ebebeb] text-ink"
          : "text-muted hover:bg-[#f0f0f0] hover:text-ink"
      }`}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
      {...linkProps}
    >
      <FileText
        size={12}
        strokeWidth={1.5}
        aria-hidden="true"
        className="text-[#9a9a9a] flex-none"
      />
      <span className="truncate flex-1">{name}</span>
      {external && (
        <ArrowUpRight
          size={10}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#9a9a9a] flex-none"
        />
      )}
    </a>
  );
}
