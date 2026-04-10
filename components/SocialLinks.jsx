'use client';

import { FaImdb, FaLinkedin, FaVimeoV, FaYoutube } from 'react-icons/fa';

const socials = [
  { label: 'IMDb', href: '#', icon: FaImdb, colorClass: 'text-[#F5C518]', hoverColorClass: 'group-hover:text-[#F5C518]' },
  { label: 'LinkedIn', href: '#', icon: FaLinkedin, colorClass: 'text-[#0A66C2]', hoverColorClass: 'group-hover:text-[#0A66C2]' },
  { label: 'Vimeo', href: '#', icon: FaVimeoV, colorClass: 'text-[#1AB7EA]', hoverColorClass: 'group-hover:text-[#1AB7EA]' },
  { label: 'YouTube', href: '#', icon: FaYoutube, colorClass: 'text-[#FF0000]', hoverColorClass: 'group-hover:text-[#FF0000]' },
];

export default function SocialLinks({ size = 44, theme = 'primary' }) {
  return (
    <nav className="flex flex-wrap items-center gap-4">
      {socials.map(({ label, href, icon: Icon, colorClass, hoverColorClass }) => {
        const iconClass =
          theme === 'primary' ? colorClass
          : theme === 'secondary' ? `text-white/60 ${hoverColorClass}`
          : 'text-white/30 group-hover:text-white';

        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group transition-transform duration-300 hover:scale-110 inline-flex"
          >
            <span className={`inline-flex transition-colors duration-300 ${iconClass}`}>
              <Icon size={size} />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
