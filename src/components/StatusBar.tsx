"use client";

import { GitBranch } from "lucide-react";
import { useRef, useState } from "react";

const PGP_FINGERPRINT = "1D504075ADC4407FD14094B5CD4284777D69360D";
const PGP_TAIL = "7D69 360D";

interface StatusBarProps {
  activeId: string;
}

function Separator() {
  return (
    <span aria-hidden="true" className="mx-2 text-[#d4d4d4]">
      ·
    </span>
  );
}

export default function StatusBar({ activeId }: StatusBarProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PGP_FINGERPRINT);
    } catch {
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site status"
      className="status-bar sb-statusbar-position fixed bottom-0 right-0 z-20 h-6 flex items-center justify-between px-3 bg-[#fafafa] border-t border-[#e5e5e5] font-mono text-[11px] text-muted"
    >
      <div className="flex items-center">
        <GitBranch
          size={10}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#9a9a9a] mr-1.5 flex-none"
        />
        <span>main</span>
        <Separator />
        <span className="inline-block min-w-[150px]">
          ~/provin#{activeId}
        </span>
        <span className="hidden sm:inline-flex items-center">
          <Separator />
          <span>UTF-8</span>
        </span>
      </div>

      <div className="flex items-center">
        <a
          href="mailto:killian@provin.fr"
          className="hover:text-ink hover:underline underline-offset-[3px] decoration-1"
        >
          killian@provin.fr
        </a>
        <span className="hidden sm:inline-flex items-center">
          <Separator />
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy full PGP fingerprint"
            title="Click to copy full PGP fingerprint"
            className="inline-block min-w-[96px] text-left bg-transparent border-0 p-0 m-0 hover:text-ink cursor-pointer"
          >
            {copied ? "copied" : `pgp ${PGP_TAIL}`}
          </button>
        </span>
        <Separator />
        <span>© 2026</span>
      </div>
    </footer>
  );
}
