"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full font-meta text-xs tracking-widest uppercase text-white/80 hover:text-white transition-colors"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span className={locale === "fr" ? "opacity-100" : "opacity-30"} style={{ fontSize: '1.1rem', lineHeight: 1 }}>🇫🇷</span>
      <span className="text-white/20">/</span>
      <span className={locale === "en" ? "opacity-100" : "opacity-30"} style={{ fontSize: '1.1rem', lineHeight: 1 }}>🇺🇸</span>
    </button>
  );
}
