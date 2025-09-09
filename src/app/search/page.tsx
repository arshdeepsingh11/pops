"use client";

import Image from "next/image";
import React from "react";
import { Search as SearchIcon, QrCode, Video, Play } from "lucide-react";

type MediaItem = {
  id: string;
  src: string;       // Unsplash URL
  alt: string;
  kind: "image" | "video";
};

const ITEMS: MediaItem[] = [
  { id: "1",  src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", alt: "Startup logo",      kind: "image" },
  { id: "2",  src: "https://images.unsplash.com/photo-1552053831-71594a27632d",    alt: "Portrait 1",       kind: "video" },
  { id: "3",  src: "https://images.unsplash.com/photo-1484704849700-f032a568e944", alt: "Bulb frame",       kind: "image" },
  { id: "4",  src: "https://images.unsplash.com/photo-1556761175-b413da4baf72",    alt: "Product podium",   kind: "image" },
  { id: "5",  src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", alt: "Bottle product",   kind: "image" },
  { id: "6",  src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12", alt: "Portrait 2",       kind: "image" },
  { id: "7",  src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70", alt: "Bulb sketch",      kind: "image" },
  { id: "8",  src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", alt: "Landscape demo",   kind: "image" },
  { id: "9",  src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",    alt: "Team group",       kind: "video" },
  { id: "10", src: "https://images.unsplash.com/photo-1541534401786-2077eed87a74", alt: "Portrait 3",       kind: "image" },
  { id: "11", src: "https://images.unsplash.com/photo-1520975807228-23c0f86be6fd", alt: "Bulb orange",      kind: "image" },
  { id: "12", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", alt: "Pitch video",      kind: "video" },
  { id: "13", src: "https://images.unsplash.com/photo-1602524819631-42f1d6c6d5f9", alt: "Pedestal arch",    kind: "image" },
  { id: "14", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",    alt: "Avatar",           kind: "image" },
  { id: "15", src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f", alt: "Bulb glow",        kind: "image" }
];

export default function SearchPage(): JSX.Element {
  const [query, setQuery] = React.useState("");

  const list = query.trim()
    ? ITEMS.filter(i => i.alt.toLowerCase().includes(query.toLowerCase()))
    : ITEMS;

  return (
    <div>
      {/* Top search row */}
      <div className="search-wrap">
        <div className="search-row">
          <label className="search-bar" htmlFor="pops-search">
            <SearchIcon className="search-icon" aria-hidden="true" />
            <input
              id="pops-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search startups, investors…"
              aria-label="Search"
            />
          </label>

          <button className="icon-round" aria-label="Open videos">
            <Video className="svg" />
          </button>

          <button className="icon-round" aria-label="Open QR scanner">
            <QrCode className="svg" />
          </button>
        </div>
      </div>

      {/* 3-column square grid */}
      <div className="media-grid">
        {list.map(item => (
          <div key={item.id} className="tile">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="33vw"
              style={{ objectFit: "cover" }}
            />
            {item.kind === "video" && (
              <div className="play-badge">
                <Play className="svg" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
