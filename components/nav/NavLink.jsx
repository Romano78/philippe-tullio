"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function NavLink({ href, children, className, onClick }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative font-meta text-xs tracking-widest uppercase transition-colors duration-300 group",
        isActive ? "text-white" : "text-white/60 hover:text-white",
        className
      )}
    >
      {children}

      {/* Underline indicator */}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ease-out",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}
