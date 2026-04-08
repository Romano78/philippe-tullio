"use client";

import { useRef, useLayoutEffect } from "react";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const pad = (n) => String(n + 1).padStart(2, "0");

export default function ProjectContent({ project, index, total }) {
  const wrapperRef = useRef(null);
  const clientRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);

  // Set initial positions synchronously before paint — prevents flash
  useLayoutEffect(() => {
    gsap.set(titleRef.current, { yPercent: 110 });
    gsap.set([clientRef.current, metaRef.current, ctaRef.current], {
      opacity: 0,
      y: 10,
    });
  }, [project.id]);

  // Animate in whenever project changes
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(clientRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          { yPercent: 0, duration: 0.75, ease: "power3.out" },
          "-=0.25"
        )
        .to(
          metaRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        );
    },
    { scope: wrapperRef, dependencies: [project.id] }
  );

  return (
    <>
      {/* Bottom-left: project metadata + title + CTA */}
      <div
        ref={wrapperRef}
        className="fixed bottom-16 left-8 md:left-32 z-40 max-w-2xl pointer-events-none overflow-hidden max-h-[calc(100svh-8rem)]"
      >
        {/* Director credit */}
        <p
          ref={clientRef}
          className="font-meta text-sm tracking-widest uppercase text-accent mb-3"
        >
          {project.credits?.find((c) => c.role === 'direction')?.name}
        </p>

        {/* Title — overflow-hidden clips the slide-up */}
        <div className="overflow-hidden mb-6">
          <h1
            ref={titleRef}
            className="font-display text-7xl md:text-9xl uppercase text-white leading-none"
          >
            {project.title}
          </h1>
        </div>

        {/* Brand — category — year */}
        <p ref={metaRef} className="font-meta text-xs tracking-widest uppercase mb-8">
          <span className="opacity-40 text-accent">{project.brand}</span>
          <span className="text-white/40"> — </span>
          <span className="opacity-40 text-accent">{project.category}</span>
          <span className="text-white/40"> — {project.year}</span>
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="pointer-events-auto">
          <Link
            href={project.ctaHref ?? `/work/${project.slug}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-meta text-xs tracking-widest uppercase text-white/80 border border-border transition-colors hover:bg-white/10 hover:text-white"
          >
            Watch Project
            <span className="text-accent">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom-right: project counter */}
      <div className="fixed bottom-16 right-8 md:right-12 z-40 pointer-events-none">
        <p className="font-meta text-xs tracking-widest text-white/30">
          <span className="text-white/70">{pad(index)}</span>
          {" / "}
          {pad(total - 1)}
        </p>
      </div>
    </>
  );
}
