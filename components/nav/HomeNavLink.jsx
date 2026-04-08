"use client";

import { usePathname } from "@/i18n/navigation";
import NavLink from "./NavLink";

export default function HomeNavLink({ label }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <NavLink href="/">{label}</NavLink>;
}
