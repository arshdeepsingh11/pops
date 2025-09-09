'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties } from 'react';

type Item = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const iconStyle: CSSProperties = { width: 24, height: 24 };

function HomeIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle} fill={active ? 'black' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function SearchIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" fill={active ? 'black' : 'none'} />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function LadybirdIcon(active: boolean) {
  // Ladybird (ladybug) icon 🙂
  return (
    <svg viewBox="0 0 24 24" style={iconStyle} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="6" fill={active ? 'black' : 'none'} />
      <circle cx="10" cy="12" r="1.2" />
      <circle cx="14" cy="12" r="1.2" />
      <path d="M12 7V3" />
      <path d="M8 9.5 5 8" />
      <path d="M16 9.5 19 8" />
      <path d="M12 19.2V22" />
    </svg>
  );
}
function BellIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle} fill={active ? 'black' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M9.5 21h5" />
    </svg>
  );
}
function MessageIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle} fill={active ? 'black' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M21 15a4 4 0 0 1-4 4H9l-6 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}

export default function BottomTabs() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const items: Item[] = [
    { href: '/',            label: 'Home',         icon: HomeIcon(isActive('/')) },
    { href: '/search',      label: 'Search',       icon: SearchIcon(isActive('/search')) },
    { href: '/spark',       label: 'Ladybird',     icon: LadybirdIcon(isActive('/spark')) },
    { href: '/notifications', label: 'Alerts',     icon: BellIcon(isActive('/notifications')) },
    { href: '/messages',    label: 'Messages',     icon: MessageIcon(isActive('/messages')) },
  ];

  return (
    <nav className="bottom-tabs" role="navigation" aria-label="Bottom tabs">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className={`tab ${isActive(it.href) ? 'active' : ''}`}>
          {it.icon}
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}
