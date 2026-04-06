import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import LangToggle from './LangToggle';
import NavLink from './NavLink';
import { routes } from '@/config/routes';

export default async function DesktopNav() {
  const t = await getTranslations('nav');

  const links = [
    { label: t('about'), href: routes.about },
    { label: t('gallery'), href: routes.gallery },
    { label: t('contact'), href: routes.contact },
  ];
  return (
    <div className='site-px w-full hidden md:block py-4'>
      <div className='site-max flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='font-display text-white text-lg leading-none tracking-tight uppercase flex flex-col'
        >
          <img
            src='/TP_Seul_Blanc.png'
            alt='Philippe Tullio Logo'
            width={40}
            height={40}
          />
        </Link>

        {/* Nav links pill */}
        <nav
          className='flex items-center gap-6 px-6 py-2.5 rounded-full'
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255,255,255,0.1)',
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
    </div>
  );
}
