import Link from "next/link";
import LangToggle from "./LangToggle";
import NavLink from "./NavLink";
import { routes } from "@/config/routes";

const links = [
  { label: "About", href: routes.about },
  { label: "Gallery", href: routes.gallery },
  { label: "Contact", href: routes.contact },
];

export default function DesktopNav() {
  return (
    <div className="hidden md:flex items-center justify-between w-full px-6 py-4">
      {/* Logo */}
      <Link href="/" className="font-display text-white text-lg leading-none tracking-tight uppercase flex flex-col">
        <span>Tullio</span>
        <span>Philippe</span>
      </Link>

      {/* Nav links pill */}
      <nav
        className="flex items-center gap-6 px-6 py-2.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {links.map((link) => (
          <NavLink key={link.label} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Language toggle */}
      <LangToggle />
    </div>
  );
}
