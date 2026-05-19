"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarToggleProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SidebarToggle({
  open,
  onToggle,
  className,
}: SidebarToggleProps) {
  const Icon = open ? PanelLeftClose : PanelLeftOpen;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      aria-expanded={open}
      className={`w-8 h-8 inline-flex items-center justify-center text-muted hover:text-ink cursor-pointer${
        className ? ` ${className}` : ""
      }`}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
