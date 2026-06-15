"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sectionIds } from "@/data/sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";
import MobileBackdrop from "./MobileBackdrop";
import Sidebar from "./Sidebar";
import SidebarToggle from "./SidebarToggle";
import StatusBar from "./StatusBar";

type SidebarState = "default" | "open" | "closed";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Tri-state. "default" lets CSS media queries decide (open on desktop,
  // closed on mobile). "open" / "closed" force the override via the
  // data-sidebar attribute. Initial value is always "default" so SSR and
  // first client render produce identical HTML — no FOUC, no hydration
  // mismatch.
  const pathname = usePathname();
  const [state, setState] = useState<SidebarState>("default");
  const activeId = useActiveSection(sectionIds);

  const toggle = useCallback(() => {
    setState((current) => {
      if (current === "open") return "closed";
      if (current === "closed") return "open";
      // From "default" — resolve the current visual via matchMedia and
      // flip it. matchMedia is only read here, never in render.
      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      return isDesktop ? "closed" : "open";
    });
  }, []);

  const close = useCallback(() => setState("closed"), []);

  const handleItemSelect = useCallback(() => {
    const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (!isDesktop) setState("closed");
  }, []);

  // Body scroll lock when the drawer is forced open on mobile.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const apply = () => {
      const shouldLock = state === "open" && !mql.matches;
      document.body.style.overflow = shouldLock ? "hidden" : "";
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      document.body.style.overflow = "";
    };
  }, [state]);

  // Escape dismisses the mobile drawer.
  useEffect(() => {
    if (state !== "open") return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !mql.matches) setState("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  // Cmd+B / Ctrl+B toggles.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key !== "b" && event.key !== "B") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  if (pathname === "/") {
    return (
      <main className="px-6 md:px-12 pb-12">
        <div className="max-w-[680px] mx-auto">{children}</div>
      </main>
    );
  }

  return (
    <div data-sidebar={state === "default" ? undefined : state}>
      <Sidebar
        activeId={activeId}
        onToggle={toggle}
        onItemSelect={handleItemSelect}
      />
      <MobileBackdrop onClick={close} />
      <SidebarToggle
        open={false}
        onToggle={toggle}
        className="sb-floating-toggle fixed top-4 left-4 z-50"
      />
      <main className="sb-content pb-12">
        <div className="sb-column max-w-[680px]">{children}</div>
      </main>
      <StatusBar activeId={activeId} />
    </div>
  );
}
