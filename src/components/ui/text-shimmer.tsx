"use client";

import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export function TextShimmer({
  children,
  className,
  duration = 2.5,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <span
      className={cn(
        "bg-[linear-gradient(90deg,#000_0%,#fff_35%,var(--shimmer-color)_50%,#fff_65%,#000_100%)] bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
      style={{
        animation: `text-shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
