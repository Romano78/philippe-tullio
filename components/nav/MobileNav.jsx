"use client";

import { useState } from "react";
import Link from "next/link";
import { AlignRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex md:hidden items-center justify-between w-full px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex">
          <img src='/TP_Seul_Blanc.png' alt='Philippe Tullio Logo' width={40} height={40} />
        </Link>

        {/* Menu pill */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-meta text-xs tracking-widest uppercase text-white/80 hover:text-white transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Menu <AlignRight size={14} />
        </button>
      </div>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
