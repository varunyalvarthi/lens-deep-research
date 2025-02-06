"use client"

import { cn } from "@/lib/utils"
import type React from "react"

function IconLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      {/* Outer circle (lens body) */}
      <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="16" />

      {/* Inner circle (glass element) */}
      <circle cx="128" cy="128" r="80" stroke="currentColor" strokeWidth="8" />

      {/* Center circle (aperture) */}
      <circle cx="128" cy="128" r="40" fill="currentColor" />

      {/* Lens reflections */}
      <circle cx="96" cy="96" r="16" fill="currentColor" opacity="0.6" />
      <circle cx="160" cy="160" r="12" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export { IconLogo }

