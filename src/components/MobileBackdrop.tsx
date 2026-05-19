"use client";

interface MobileBackdropProps {
  onClick: () => void;
}

export default function MobileBackdrop({ onClick }: MobileBackdropProps) {
  return (
    <div
      onClick={onClick}
      aria-hidden="true"
      className="sb-backdrop fixed inset-0 z-30 bg-black/30"
    />
  );
}
