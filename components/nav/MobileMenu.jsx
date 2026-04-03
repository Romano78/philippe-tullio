"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { routes } from "@/config/routes";
import LangToggle from "./LangToggle";
import NavLink from "./NavLink";

const links = [
  { label: "About", href: routes.about },
  { label: "Gallery", href: routes.gallery },
  { label: "Contact", href: routes.contact },
];

export default function MobileMenu({ isOpen, onClose }) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[#0E0E0E]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={onClose} className="font-display text-white text-lg leading-none tracking-tight uppercase flex flex-col">
              <span>Tullio</span>
              <span>Philippe</span>
            </Link>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-meta text-xs tracking-widest uppercase text-white/80"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Close <X size={14} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col justify-center flex-1 px-6 gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  href={link.href}
                  onClick={onClose}
                  className="!text-5xl !tracking-normal font-display"
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Lang toggle */}
          <div className="px-6 py-8">
            <LangToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
