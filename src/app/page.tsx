"use client";

import { useEffect, useMemo, useState } from "react";

/** Feed data uses base names; images are in /public/images with any of: png|jpg|jpeg|webp */
type Post = { id:string; author:string; handle:string; ago:string; text:string; avatarBase:string; photoBase?:string };

const FEED: Post[] = [
  { id:"1", author:"Liam", handle:"@liam", ago:"2h",
    text:"Just shipped a new feature for Pops! Feeling pumped about the future of this app. 🚀",
    avatarBase:"liam" },
  { id:"2", author:"Ava", handle:"@ava", ago:"4h",
    text:"Enjoying a beautiful day at the park. ☀️",
    avatarBase:"ava", photoBase:"park" },
  { id:"3", author:"Noah", handle:"@noah", ago:"6h",
    text:"What's everyone's favorite design tool? I'm team Figma all the way. ✨",
    avatarBase:"noah" },
];

/* -------- helpers to try multiple extensions -------- */
function useImageFallback(base: string, exts = ["png","jpg","jpeg","webp"]) {
  const [i,setI] = useState(0);
  const src = useMemo(() => `/images/${base}.${exts[i]}`, [base,exts,i]);
  const onError = () => setI(n => (n+1<exts.length ? n+1 : n));
  const exhausted = i >= exts.length-1;
  return { src,onError,exhausted };
}
function Avatar({base,alt}:{base:string;alt:string}) {
  const {src,onError,exhausted} = useImageFallback(base);
  const [fail,setFail] = useState(false);
  useEffect(()=>setFail(false),[base]);
  if (fail) return <div className="avatar-fallback" aria-label={alt} title={alt} />;
  return <img className="avatar-img" src={src} alt={alt} onError={() => exhausted?setFail(true):onError()} />;
}
function PostPhoto({base}:{base:string}) {
  const {src,onError,exhausted} = useImageFallback(base);
  const [fail,setFail] = useState(false);
  useEffect(()=>setFail(false),[base]);
  if (fail) return null;
  return <img className="feed-photo" src={src} alt="" onError={() => exhausted?setFail(true):onError()} />;
}

export default function HomePage() {
  const [isDark,setIsDark] = useState(false);
  useEffect(()=>{
    const stored = localStorage.getItem("pops-theme");
    if (stored === "dark") { document.documentElement.classList.add("dark"); setIsDark(true); }
  },[]);
  useEffect(()=>{
    document.documentElement.classList.toggle("dark",isDark);
    localStorage.setItem("pops-theme", isDark ? "dark" : "light");
  },[isDark]);

  return (
    <div>
      {/* Header */}
      <header className="topbar">
        <button className="icon-btn" aria-label="Menu">
          <div className="hamburger"><span/><span/><span/></div>
        </button>
        <h1>POPS</h1>
        <button className="icon-btn" onClick={()=>setIsDark(v=>!v)} aria-label="Theme">
          <svg viewBox="0 0 24 24" className="svg" fill={isDark?"currentColor":"none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 3a7 7 0 0 0-7 7c0 2.7 1.5 4.5 3 6h8c1.5-1.5 3-3.3 3-6a7 7 0 0 0-7-7Z" />
            <path d="M10 19h4m-3 3h2" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="container">
        {/* Composer */}
        <div className="card compose">
          <Avatar base="you" alt="Your avatar" />
          <input className="input" placeholder="What’s popping?" />
          <button className="icon-btn" aria-label="Post">
            <svg viewBox="0 0 24 24" className="svg" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>

        {/* Feed */}
        {FEED.map(p=>(
          <article key={p.id} className="feed-card">
            <div className="feed-head">
              <Avatar base={p.avatarBase} alt={`${p.author} avatar`} />
              <div>
                <div className="author">{p.author}</div>
                <div className="handle">{p.handle} • {p.ago}</div>
              </div>
            </div>
            <div className="body" style={{lineHeight:1.5}}>{p.text}</div>
            {p.photoBase && <div className="feed-img"><PostPhoto base={p.photoBase}/></div>}
            <div className="actions">
              <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                <svg viewBox="0 0 24 24" className="svg" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>30
              </span>
              <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                <svg viewBox="0 0 24 24" className="svg" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H9l-6 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>15
              </span>
              <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                <svg viewBox="0 0 24 24" className="svg" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5"/></svg>8
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* FAB */}
      <div className="fab-wrap">
        <button className="fab" aria-label="Create">
          <svg viewBox="0 0 24 24" className="svg" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.5 7.5L23 11l-7.5 3.5L12 22l-3.5-7.5L1 11l7.5-1.5L12 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
