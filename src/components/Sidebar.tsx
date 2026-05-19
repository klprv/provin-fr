"use client";

import { useCallback } from "react";
import { sidebarTree, type SidebarNode } from "@/data/sidebar";
import SidebarFolder from "./SidebarFolder";
import SidebarItem from "./SidebarItem";
import SidebarToggle from "./SidebarToggle";

const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH ?? "dev";
const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE ?? "local";
const version =
  buildDate === "local"
    ? "vdev"
    : `v${buildDate.split(".").slice(0, 2).join(".")}`;

interface SidebarProps {
  activeId: string;
  onToggle: () => void;
  onItemSelect: () => void;
}

function renderNode(
  node: SidebarNode,
  index: number,
  activeId: string,
  onSelect: (href: string) => void,
) {
  if (node.type === "file") {
    return (
      <SidebarItem
        key={`file-${node.name}-${index}`}
        name={node.name}
        href={node.href}
        active={activeId === node.href.slice(1)}
        depth={0}
        onSelect={onSelect}
      />
    );
  }
  if (node.type === "external") {
    return (
      <SidebarItem
        key={`external-${node.name}-${index}`}
        name={node.name}
        href={node.href}
        active={false}
        depth={0}
        external
        onSelect={onSelect}
      />
    );
  }
  return (
    <SidebarFolder
      key={`folder-${node.name}-${index}`}
      name={node.name}
      defaultOpen={node.defaultOpen}
      nodes={node.children}
      depth={0}
      activeId={activeId}
      onSelect={onSelect}
    />
  );
}

export default function Sidebar({
  activeId,
  onToggle,
  onItemSelect,
}: SidebarProps) {
  const handleSelect = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
        }
      }
      onItemSelect();
    },
    [onItemSelect],
  );

  return (
    <nav
      aria-label="Site navigation"
      className="sb-sidebar fixed top-0 left-0 z-40 h-screen w-[280px] lg:w-[260px] flex flex-col bg-[#fafafa] border-r border-[#e5e5e5] font-mono text-[13px] leading-[1.8]"
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-ink font-medium">~/provin</span>
        <SidebarToggle open onToggle={onToggle} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {sidebarTree.map((node, index) =>
          renderNode(node, index, activeId, handleSelect),
        )}
      </div>

      <div className="border-t border-[#e5e5e5] p-4 text-[11px] leading-[1.5] text-[#9a9a9a]">
        <div>{version}</div>
        <div>commit {commitHash}</div>
      </div>
    </nav>
  );
}
