"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { SidebarNode } from "@/data/sidebar";
import SidebarItem from "./SidebarItem";

interface SidebarFolderProps {
  name: string;
  defaultOpen?: boolean;
  nodes: SidebarNode[];
  depth: number;
  activeId: string;
  onSelect: (href: string) => void;
}

export default function SidebarFolder({
  name,
  defaultOpen = false,
  nodes,
  depth,
  activeId,
  onSelect,
}: SidebarFolderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 py-1 pr-3 text-left text-muted hover:bg-[#f0f0f0] hover:text-ink cursor-pointer"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <Chevron
          size={12}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#9a9a9a] flex-none"
        />
        <span className="truncate">{name}</span>
      </button>
      {open &&
        nodes.map((child, index) => {
          if (child.type === "file") {
            return (
              <SidebarItem
                key={`file-${child.name}-${index}`}
                name={child.name}
                href={child.href}
                active={activeId === child.href.slice(1)}
                depth={depth + 1}
                onSelect={onSelect}
              />
            );
          }
          if (child.type === "external") {
            return (
              <SidebarItem
                key={`external-${child.name}-${index}`}
                name={child.name}
                href={child.href}
                active={false}
                depth={depth + 1}
                external
                onSelect={onSelect}
              />
            );
          }
          return (
            <SidebarFolder
              key={`folder-${child.name}-${index}`}
              name={child.name}
              defaultOpen={child.defaultOpen}
              nodes={child.children}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          );
        })}
    </>
  );
}
