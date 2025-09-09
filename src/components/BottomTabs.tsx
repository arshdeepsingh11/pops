"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: (active: boolean) => JSX.Element };
const SIZE = 22;
const stroke = (a: boolean, id: string) => ({ stroke: a ? `url(#${id})` : "currentColor" } as const);

/* --- Icons --- */
const HomeIcon = (a:boolean)=>{const id="g-home";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><path d="M3 10.5 12 3l9 7.5" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M5 9.5V21h14V9.5" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M9 21v-6h6v6" fill="none" {...stroke(a,id)} strokeWidth="1.8"/></svg>)};
const SearchIcon=(a:boolean)=>{const id="g-search";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><circle cx="11" cy="11" r="6.2" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M20 20l-3.6-3.6" fill="none" {...stroke(a,id)} strokeWidth="1.8" strokeLinecap="round"/></svg>)};
const LadybirdIcon=(a:boolean)=>{const id="g-ladybird";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><path d="M9 6.5h6" fill="none" {...stroke(a,id)} strokeWidth="1.8" strokeLinecap="round"/><path d="M8 5l-2-2M16 5l2-2" fill="none" {...stroke(a,id)} strokeWidth="1.8" strokeLinecap="round"/><path d="M12 7c-4.2 0-7.2 3.3-7.2 6.8 0 3.1 2.6 5.7 7.2 5.7s7.2-2.6 7.2-5.7C19.2 10.3 16.2 7 12 7Z" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M12 7v11.5" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><circle cx="9.3" cy="12" r="1" fill="currentColor"/><circle cx="14.7" cy="12" r="1" fill="currentColor"/><circle cx="9.8" cy="15" r="1" fill="currentColor"/><circle cx="14.2" cy="15" r="1" fill="currentColor"/></svg>)};
const VideoIcon=(a:boolean)=>{const id="g-video";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><rect x="3.4" y="5.4" width="13.2" height="13.2" rx="3" ry="3" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M16.6 10l4-2v8l-4-2z" fill="none" {...stroke(a,id)} strokeWidth="1.8" strokeLinejoin="round"/></svg>)};
const BellIcon=(a:boolean)=>{const id="g-bell";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" fill="none" {...stroke(a,id)} strokeWidth="1.8"/><path d="M9.5 21h5" fill="none" {...stroke(a,id)} strokeWidth="1.8"/></svg>)};
const MsgIcon=(a:boolean)=>{const id="g-msg";return(<svg viewBox="0 0 24 24" width={SIZE} height={SIZE}><defs><linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs><path d="M21 15a4 4 0 0 1-4 4H9l-6 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" fill="none" {...stroke(a,id)} strokeWidth="1.8"/></svg>)};

const items: Item[] = [
  { href: "/",         label: "Home",     icon: HomeIcon },
  { href: "/search",   label: "Search",   icon: SearchIcon },
  { href: "/ladybird", label: "Ladybird", icon: LadybirdIcon },
  { href: "/video",    label: "Video",    icon: VideoIcon },
  { href: "/alerts",   label: "Alerts",   icon: BellIcon },
  { href: "/messages", label: "Messages", icon: MsgIcon },
];

export default function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="bottom-tabs pro-tabs" aria-label="Primary">
      {items.map((it) => {
        const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href));
        return (
          <Link key={it.href} href={it.href} className={`tab ${active ? "active" : ""}`}>
            <span className="tab-pill">
              <span className="tab-icon">{it.icon(active)}</span>
            </span>
            <span className="tab-label">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
