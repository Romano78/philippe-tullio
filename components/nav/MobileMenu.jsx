"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routes } from "@/config/routes";
import { ease } from "@/config/cubic-beziers";
import LangToggle from "./LangToggle";
import NavLink from "./NavLink";

export default function MobileMenu({ isOpen, onClose }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    ...(pathname !== "/" ? [{ label: t("home"), href: routes.home }] : []),
    { label: t("about"), href: routes.about },
    { label: t("gallery"), href: routes.gallery },
    { label: t("contact"), href: routes.contact },
  ];
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
          transition={{ duration: 0.5, ease: ease.cinematic }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={onClose} className="flex">
              <img src='/TP_Seul_Blanc.png' alt='Philippe Tullio Logo' width={40} height={40} />
            </Link>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-meta text-xs tracking-widest uppercase text-white/80"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {t("menuClose")} <X size={14} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col justify-center flex-1 px-6 gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: ease.out }}
              >
                <NavLink
                  href={link.href}
                  onClick={onClose}
                  className="text-5xl! tracking-normal! font-display"
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
