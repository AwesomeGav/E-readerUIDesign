import { useState } from "react";

// ── Theme definitions ────────────────────────────────────────────────────────

type ThemeKey = "white" | "paper" | "sepia" | "night" | "slate";

interface Theme {
  name: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  border: string;
  navBg: string;
  pill: string;
}

const THEMES: Record<ThemeKey, Theme> = {
  white: {
    name: "White",
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceAlt: "#F8F8F8",
    text: "#000000",
    textMuted: "#767676",
    accent: "#000000",
    accentText: "#FFFFFF",
    border: "#000000",
    navBg: "#FFFFFF",
    pill: "#FFFFFF",
  },
  paper: {
    name: "Paper",
    bg: "#F5F0E8",
    surface: "#FDFAF4",
    surfaceAlt: "#EDE8DE",
    text: "#1C1814",
    textMuted: "#7A7168",
    accent: "#B8622A",
    accentText: "#FDFAF4",
    border: "#DDD8CE",
    navBg: "#FDFAF4",
    pill: "#E8E2D6",
  },
  sepia: {
    name: "Sepia",
    bg: "#E8DCC8",
    surface: "#F0E6D0",
    surfaceAlt: "#DDD0B6",
    text: "#2C2016",
    textMuted: "#7A6A52",
    accent: "#8B4513",
    accentText: "#F0E6D0",
    border: "#C8BCA4",
    navBg: "#F0E6D0",
    pill: "#D8CCBA",
  },
  night: {
    name: "Night",
    bg: "#0E0E10",
    surface: "#1A1A1E",
    surfaceAlt: "#252528",
    text: "#E8E4DC",
    textMuted: "#807A70",
    accent: "#D4914A",
    accentText: "#0E0E10",
    border: "#2E2E34",
    navBg: "#141416",
    pill: "#28282E",
  },
  slate: {
    name: "Slate",
    bg: "#E8ECF0",
    surface: "#F2F5F8",
    surfaceAlt: "#DDE3E9",
    text: "#18222C",
    textMuted: "#6A7A8A",
    accent: "#2C5F8A",
    accentText: "#F2F5F8",
    border: "#C8D4DC",
    navBg: "#F2F5F8",
    pill: "#DDE6EE",
  },
};

// ── Book data ────────────────────────────────────────────────────────────────

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
  progress: number;
  pages: number;
  description: string;
  coverColor: string;
  year: number;
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    cover: "https://images.unsplash.com/photo-1519764340700-3db40311f21e?w=300&h=420&fit=crop&auto=format",
    genre: "Literary Fiction",
    progress: 0.42,
    pages: 258,
    description: "A deeply moving story of a butler who devoted his life to his employer, only to reflect on what he may have sacrificed.",
    coverColor: "#C8B89A",
    year: 1989,
  },
  {
    id: 2,
    title: "Convenience Store Woman",
    author: "Sayaka Murata",
    cover: "https://images.unsplash.com/photo-1526050071463-2c476b162a4c?w=300&h=420&fit=crop&auto=format",
    genre: "Contemporary",
    progress: 1.0,
    pages: 163,
    description: "Keiko has worked at a convenience store for eighteen years. She is perfectly content. Her family is not.",
    coverColor: "#7A9BB5",
    year: 2016,
  },
  {
    id: 3,
    title: "The Dispossessed",
    author: "Ursula K. Le Guin",
    cover: "https://images.unsplash.com/photo-1654124803533-a51f169e1971?w=300&h=420&fit=crop&auto=format",
    genre: "Science Fiction",
    progress: 0.07,
    pages: 387,
    description: "A physicist travels to a planet of capitalist abundance after a lifetime on an anarchist utopia, challenging both worlds.",
    coverColor: "#8E7FA3",
    year: 1974,
  },
  {
    id: 4,
    title: "Stoner",
    author: "John Williams",
    cover: "https://images.unsplash.com/photo-1667929048193-4fef49b0ba0a?w=300&h=420&fit=crop&auto=format",
    genre: "Literary Fiction",
    progress: 0.65,
    pages: 278,
    description: "William Stoner enrolls at the University of Missouri intending to study agriculture. Instead he falls in love with literature.",
    coverColor: "#A87C5A",
    year: 1965,
  },
  {
    id: 5,
    title: "Piranesi",
    author: "Susanna Clarke",
    cover: "https://images.unsplash.com/photo-1753526667964-72e724f41780?w=300&h=420&fit=crop&auto=format",
    genre: "Fantasy",
    progress: 0.0,
    pages: 272,
    description: "Piranesi lives in the House. The House is beautiful. Its rooms contain statues, tides, and clouds of birds.",
    coverColor: "#5B8A8A",
    year: 2020,
  },
  {
    id: 6,
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    cover: "https://images.unsplash.com/photo-1538981457319-5e459479f9d0?w=300&h=420&fit=crop&auto=format",
    genre: "Science Fiction",
    progress: 0.88,
    pages: 216,
    description: "Charlie Gordon, a man with an IQ of 68, undergoes an experimental operation to increase his intelligence.",
    coverColor: "#C45A5A",
    year: 1966,
  },
  {
    id: 7,
    title: "A Room with a View",
    author: "E.M. Forster",
    cover: "https://images.unsplash.com/photo-1716892001657-722e6e14ae29?w=300&h=420&fit=crop&auto=format",
    genre: "Classic",
    progress: 0.0,
    pages: 240,
    description: "A young English woman traveling in Italy encounters a free-spirited man who challenges her repressed existence.",
    coverColor: "#7A9A6A",
    year: 1908,
  },
  {
    id: 8,
    title: "Minor Feelings",
    author: "Cathy Park Hong",
    cover: "https://images.unsplash.com/photo-1753526456624-9c3cadd6760d?w=300&h=420&fit=crop&auto=format",
    genre: "Essays",
    progress: 0.31,
    pages: 206,
    description: "An unflinching exploration of race, creativity, and the Asian-American experience through lyric essay.",
    coverColor: "#B87A3A",
    year: 2020,
  },
];

// ── Reader content ───────────────────────────────────────────────────────────

const SAMPLE_CHAPTER = `The Stevens family had, for nearly a hundred years, occupied the position of butler at Darlington Hall, and I can truthfully say that, of all the years we worked there, none was more significant to me than those of the summer of 1956, when my employer, Mr Farraday, suggested I might like to take a motoring holiday through the West Country.

I had at first thought it a whimsical suggestion—not at all in keeping with the tradition of our profession. A butler, I had always believed, does not simply take holidays. He is ever-present, ever-watchful, ever-mindful of the needs of those he serves. But Mr Farraday pressed the matter quite kindly, and I find now, looking back, that he was right to do so.

The West Country roads were quiet that morning. I had set out just before dawn, the great house diminishing in the rear mirror until it disappeared behind the hedgerows of Oxfordshire. There is something about the English countryside at that hour—the soft grey of the fields, the damp smell of the morning—that tends to loosen the habitual structures of thought.

I found myself, for the first time in many years, wondering whether the choices I had made—choices I had always considered to be expressions of the highest professional ideals—might also be read as something else entirely.`;

// ── Nav icons ────────────────────────────────────────────────────────────────

function IconLibrary({ size = 22, active }: { size?: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="18" rx="1" fill={active ? "currentColor" : "none"} fillOpacity={0.15} />
      <rect x="10" y="3" width="5" height="18" rx="1" fill={active ? "currentColor" : "none"} fillOpacity={0.15} />
      <rect x="17" y="3" width="4" height="18" rx="1" fill={active ? "currentColor" : "none"} fillOpacity={0.15} />
    </svg>
  );
}

function IconSearch({ size = 22, active }: { size?: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" />
    </svg>
  );
}

function IconSettings({ size = 22, active }: { size?: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={active ? "currentColor" : "none"} fillOpacity={0.15} />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconBack({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ── Components ───────────────────────────────────────────────────────────────

function BookCard({ book, theme, onOpen }: { book: Book; theme: Theme; onOpen: () => void }) {
  const pct = Math.round(book.progress * 100);
  return (
    <button
      onClick={onOpen}
      style={{ fontFamily: "Inter, sans-serif" }}
      className="flex flex-col gap-3 text-left group transition-transform duration-200 active:scale-[0.97]"
    >
      {/* Cover */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "2/3", backgroundColor: book.coverColor, border: `1px solid ${theme.border}` }}
      >
        <img
          src={book.cover}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ mixBlendMode: "multiply", opacity: 0.85 }}
        />
        {/* Progress bar at bottom */}
        {book.progress > 0 && book.progress < 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: `${theme.accent}33` }}>
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: theme.accent }}
            />
          </div>
        )}
        {book.progress === 1 && (
          <div
            className="absolute top-2 right-2 text-[10px] font-medium px-1.5 py-0.5"
            style={{ backgroundColor: theme.accent, color: theme.accentText, fontFamily: "Inter, sans-serif" }}
          >
            Done
          </div>
        )}
      </div>
      {/* Meta */}
      <div className="px-0.5">
        <p className="text-sm font-medium leading-snug line-clamp-2" style={{ color: theme.text, fontFamily: "Lora, serif" }}>
          {book.title}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: theme.textMuted }}>
          {book.author}
        </p>
        {book.progress > 0 && book.progress < 1 && (
          <p className="text-xs mt-1" style={{ color: theme.accent }}>{pct}% read</p>
        )}
      </div>
    </button>
  );
}

// ── Library view ─────────────────────────────────────────────────────────────

function LibraryView({ theme, onOpenBook }: { theme: Theme; onOpenBook: (book: Book) => void }) {
  const [filter, setFilter] = useState<"all" | "reading" | "finished">("all");
  const filters = [
    { key: "all", label: "All" },
    { key: "reading", label: "Reading" },
    { key: "finished", label: "Finished" },
  ] as const;

  const displayed = BOOKS.filter((b) => {
    if (filter === "reading") return b.progress > 0 && b.progress < 1;
    if (filter === "finished") return b.progress === 1;
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 flex-shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: theme.text, fontFamily: "Lora, serif" }}>
          Library
        </h1>
        <p className="text-sm mt-1" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
          {BOOKS.length} books
        </p>

        {/* Filter pills */}
        <div className="flex gap-2 mt-5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-1.5 text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: filter === f.key ? theme.accent : theme.surface,
                color: filter === f.key ? theme.accentText : theme.textMuted,
                border: `1px solid ${theme.border}`,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className="flex-1 overflow-y-auto px-8 pb-8"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="grid gap-x-5 gap-y-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
          {displayed.map((book) => (
            <BookCard key={book.id} book={book} theme={theme} onOpen={() => onOpenBook(book)} />
          ))}
        </div>
        {displayed.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
            <p className="text-sm">No books here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Search view ──────────────────────────────────────────────────────────────

function SearchView({ theme, onOpenBook }: { theme: Theme; onOpenBook: (book: Book) => void }) {
  const [query, setQuery] = useState("");
  const results = query.length > 1
    ? BOOKS.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const genres = [...new Set(BOOKS.map((b) => b.genre))];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 flex-shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: theme.text, fontFamily: "Lora, serif" }}>
          Search
        </h1>
        {/* Search input */}
        <div
          className="mt-5 flex items-center gap-3 px-4 py-3"
          style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
        >
          <IconSearch size={18} active={false} />
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Title, author, or genre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: theme.textMuted }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8" style={{ scrollbarWidth: "none" }}>
        {query.length <= 1 ? (
          <>
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
              Browse by genre
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setQuery(g)}
                  className="px-4 py-2 text-sm"
                  style={{ backgroundColor: theme.surface, color: theme.text, border: `1px solid ${theme.border}`, fontFamily: "Inter, sans-serif" }}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-widest mt-8 mb-4" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
              Recently added
            </p>
            <div className="flex flex-col gap-3">
              {BOOKS.slice(0, 4).map((book) => (
                <SearchRow key={book.id} book={book} theme={theme} onOpen={() => onOpenBook(book)} />
              ))}
            </div>
          </>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-3">
            {results.map((book) => (
              <SearchRow key={book.id} book={book} theme={theme} onOpen={() => onOpenBook(book)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
            <p className="text-sm">No results for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchRow({ book, theme, onOpen }: { book: Book; theme: Theme; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-4 p-3 text-left transition-colors duration-100 active:opacity-70"
      style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
    >
      <div
        className="w-12 h-16 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: book.coverColor, border: `1px solid ${theme.border}` }}
      >
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" style={{ mixBlendMode: "multiply", opacity: 0.8 }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: theme.text, fontFamily: "Lora, serif" }}>
          {book.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
          {book.author}
        </p>
        <p
          className="text-xs mt-1 px-2 py-0.5 inline-block"
          style={{ backgroundColor: theme.surface, color: theme.textMuted, border: `1px solid ${theme.border}`, fontFamily: "Inter, sans-serif" }}
        >
          {book.genre}
        </p>
      </div>
      {book.progress > 0 && (
        <div className="text-xs font-medium flex-shrink-0" style={{ color: theme.accent, fontFamily: "Inter, sans-serif" }}>
          {book.progress === 1 ? "Done" : `${Math.round(book.progress * 100)}%`}
        </div>
      )}
    </button>
  );
}

// ── Settings helpers ─────────────────────────────────────────────────────────

function SettingsRow({
  label,
  sublabel,
  right,
  theme,
  last = false,
}: {
  label: string;
  sublabel?: string;
  right: React.ReactNode;
  theme: Theme;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{
        borderBottom: last ? "none" : `1px solid ${theme.border}`,
        backgroundColor: theme.surface,
      }}
    >
      <div>
        <p className="text-sm" style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}>{label}</p>
        {sublabel && <p className="text-xs mt-0.5" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{sublabel}</p>}
      </div>
      <div>{right}</div>
    </div>
  );
}

function Toggle({ on, onChange, theme }: { on: boolean; onChange: (v: boolean) => void; theme: Theme }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="w-11 h-6 relative flex-shrink-0 transition-colors duration-200"
      style={{
        backgroundColor: on ? theme.accent : theme.surfaceAlt,
        border: `1px solid ${theme.border}`,
      }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 transition-all duration-200"
        style={{
          left: on ? "calc(100% - 22px)" : "2px",
          backgroundColor: on ? theme.accentText : theme.textMuted,
        }}
      />
    </button>
  );
}

function StorageBar({ used, total, theme }: { used: number; total: number; theme: Theme }) {
  const pct = (used / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{used} GB used</span>
        <span className="text-xs" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{total} GB total</span>
      </div>
      <div className="h-1.5 w-full" style={{ backgroundColor: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
        <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct > 85 ? "#C0392B" : theme.accent }} />
      </div>
      <div className="flex gap-4 mt-2">
        {[
          { label: "Books", gb: 14.2, color: theme.accent },
          { label: "System", gb: 4.8, color: theme.textMuted },
          { label: "Free", gb: total - used, color: theme.border },
        ].map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2" style={{ backgroundColor: seg.color, border: `1px solid ${theme.border}` }} />
            <span className="text-xs" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{seg.label} · {seg.gb.toFixed(1)} GB</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BatteryIcon({ pct, charging, theme }: { pct: number; charging: boolean; theme: Theme }) {
  const color = pct < 20 ? "#C0392B" : pct < 40 ? "#E67E22" : theme.accent;
  return (
    <div className="flex items-center gap-2">
      {charging && (
        <svg width={12} height={12} viewBox="0 0 24 24" fill={color}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
      )}
      <span className="text-sm font-medium" style={{ color, fontFamily: "Inter, sans-serif" }}>{pct}%</span>
      <div className="flex items-center gap-0.5">
        <div className="relative w-8 h-4" style={{ border: `1.5px solid ${theme.border}` }}>
          <div
            className="absolute inset-0 transition-all"
            style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.85 }}
          />
        </div>
        <div className="w-1 h-2" style={{ backgroundColor: theme.border }} />
      </div>
    </div>
  );
}

// ── Settings view ────────────────────────────────────────────────────────────

function SettingsView({
  theme,
  currentTheme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  lineHeight,
  onLineHeightChange,
}: {
  theme: Theme;
  currentTheme: ThemeKey;
  onThemeChange: (k: ThemeKey) => void;
  fontSize: number;
  onFontSizeChange: (n: number) => void;
  lineHeight: number;
  onLineHeightChange: (n: number) => void;
}) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplane, setAirplane] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [nightLight, setNightLight] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(40);

  const battery = 67;
  const charging = false;
  const storageUsed = 19;
  const storageTotal = 64;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 flex-shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: theme.text, fontFamily: "Lora, serif" }}>
          Settings
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8" style={{ scrollbarWidth: "none" }}>

        {/* ── Device status ── */}
        <SectionLabel label="Device" theme={theme} />
        <div className="mt-3 mb-8 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          <SettingsRow
            label="Battery"
            sublabel={charging ? "Charging via USB-C" : "On battery"}
            right={<BatteryIcon pct={battery} charging={charging} theme={theme} />}
            theme={theme}
          />
          <SettingsRow
            label="Storage"
            sublabel={`${storageTotal - storageUsed} GB available`}
            right={<span className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{storageUsed}/{storageTotal} GB</span>}
            theme={theme}
          />
          <div className="px-4 py-4" style={{ borderTop: `1px solid ${theme.border}`, backgroundColor: theme.surface }}>
            <StorageBar used={storageUsed} total={storageTotal} theme={theme} />
          </div>
          <SettingsRow
            label="RAM"
            sublabel="Memory in use"
            right={<span className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>3.1 / 6 GB</span>}
            theme={theme}
            last
          />
        </div>

        {/* ── Display ── */}
        <SectionLabel label="Display" theme={theme} />
        <div className="mt-3 mb-8 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          <div className="px-4 py-3" style={{ borderBottom: `1px solid ${theme.border}`, backgroundColor: theme.surface }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}>Brightness</span>
              <span className="text-sm" style={{ color: theme.accent, fontFamily: "Inter, sans-serif" }}>{brightness}%</span>
            </div>
            <input
              type="range" min={5} max={100} step={1} value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1 appearance-none cursor-pointer"
              style={{ accentColor: theme.accent }}
            />
          </div>
          <SettingsRow label="Night light" sublabel="Reduces blue light" right={<Toggle on={nightLight} onChange={setNightLight} theme={theme} />} theme={theme} />
          <SettingsRow label="Auto-rotate" sublabel="Landscape & portrait" right={<Toggle on={autoRotate} onChange={setAutoRotate} theme={theme} />} theme={theme} />
          <SettingsRow label="Screen timeout" right={<span className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>5 min</span>} theme={theme} last />
        </div>

        {/* ── Sound ── */}
        <SectionLabel label="Sound" theme={theme} />
        <div className="mt-3 mb-8 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          <div className="px-4 py-3" style={{ borderBottom: `1px solid ${theme.border}`, backgroundColor: theme.surface }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}>Volume</span>
              <span className="text-sm" style={{ color: theme.accent, fontFamily: "Inter, sans-serif" }}>{volume}%</span>
            </div>
            <input
              type="range" min={0} max={100} step={1} value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 appearance-none cursor-pointer"
              style={{ accentColor: theme.accent }}
            />
          </div>
          <SettingsRow label="Do not disturb" sublabel="Silence all notifications" right={<Toggle on={doNotDisturb} onChange={setDoNotDisturb} theme={theme} />} theme={theme} last />
        </div>

        {/* ── Connectivity ── */}
        <SectionLabel label="Connectivity" theme={theme} />
        <div className="mt-3 mb-8 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          <SettingsRow
            label="Wi-Fi"
            sublabel={wifi ? "Home_Network_5G" : "Disconnected"}
            right={<Toggle on={wifi} onChange={setWifi} theme={theme} />}
            theme={theme}
          />
          <SettingsRow
            label="Bluetooth"
            sublabel={bluetooth ? "Connected: Kindle Keyboard" : "Off"}
            right={<Toggle on={bluetooth} onChange={setBluetooth} theme={theme} />}
            theme={theme}
          />
          <SettingsRow
            label="Airplane mode"
            sublabel="Disables all radios"
            right={<Toggle on={airplane} onChange={setAirplane} theme={theme} />}
            theme={theme}
            last
          />
        </div>

        {/* ── Sync & updates ── */}
        <SectionLabel label="Sync & updates" theme={theme} />
        <div className="mt-3 mb-8 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          <SettingsRow label="Auto-sync library" sublabel="Sync over Wi-Fi" right={<Toggle on={autoSync} onChange={setAutoSync} theme={theme} />} theme={theme} />
          <SettingsRow label="Last synced" right={<span className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>Today, 08:41</span>} theme={theme} />
          <SettingsRow label="OS updates" sublabel="Folio OS 1.0.0" right={<span className="text-sm" style={{ color: theme.accent, fontFamily: "Inter, sans-serif" }}>Up to date</span>} theme={theme} last />
        </div>

        {/* ── Reading theme ── */}
        <SectionLabel label="Reading theme" theme={theme} />
        <div className="grid grid-cols-2 gap-3 mt-3 mb-8">
          {(Object.entries(THEMES) as [ThemeKey, Theme][]).map(([key, t]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              className="flex items-center gap-3 px-4 py-3 text-left transition-all duration-150"
              style={{
                backgroundColor: t.surface,
                border: currentTheme === key ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
              }}
            >
              <div className="w-8 h-8 flex-shrink-0" style={{ backgroundColor: t.bg, border: `3px solid ${t.accent}` }} />
              <div>
                <p className="text-sm font-medium" style={{ color: t.text, fontFamily: "Inter, sans-serif" }}>{t.name}</p>
                <p className="text-xs" style={{ color: t.textMuted, fontFamily: "Inter, sans-serif" }}>
                  {key === "white" ? "Pure white" : key === "paper" ? "Warm white" : key === "sepia" ? "Warm amber" : key === "night" ? "Dark mode" : "Cool grey"}
                </p>
              </div>
              {currentTheme === key && (
                <div className="ml-auto">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* ── Typography ── */}
        <SectionLabel label="Reading typography" theme={theme} />
        <div className="mt-3 mb-8 flex flex-col gap-4">
          <SliderSetting label="Font size" value={fontSize} min={14} max={26} step={1} display={`${fontSize}px`} onChange={onFontSizeChange} theme={theme} />
          <SliderSetting label="Line height" value={lineHeight} min={1.3} max={2.2} step={0.1} display={lineHeight.toFixed(1)} onChange={onLineHeightChange} theme={theme} />
        </div>

        {/* ── About ── */}
        <SectionLabel label="About this device" theme={theme} />
        <div className="mt-3 overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
          {[
            ["OS name", "Folio OS"],
            ["Version", "1.0.0"],
            ["Build date", "2026-09-07"],
            ["Model", "Folio Tab 10.4"],
            ["Serial", "FT104-2026-00841"],
            ["Processor", "Snapdragon 7s Gen 2"],
          ].map(([label, val], i, arr) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : "none",
                backgroundColor: theme.surface,
              }}
            >
              <span className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{label}</span>
              <span className="text-sm" style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}>{val}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function SectionLabel({ label, theme }: { label: string; theme: Theme }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
      {label}
    </p>
  );
}

function SliderSetting({
  label, value, min, max, step, display, onChange, theme,
}: {
  label: string; value: number; min: number; max: number; step: number; display: string; onChange: (n: number) => void; theme: Theme;
}) {
  return (
    <div className="px-4 py-3" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm" style={{ color: theme.text, fontFamily: "Inter, sans-serif" }}>{label}</span>
        <span className="text-sm font-medium" style={{ color: theme.accent, fontFamily: "Inter, sans-serif" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 appearance-none cursor-pointer"
        style={{ accentColor: theme.accent }}
      />
    </div>
  );
}

// ── Reader view ──────────────────────────────────────────────────────────────

function ReaderView({
  book,
  theme,
  fontSize,
  lineHeight,
  onClose,
}: {
  book: Book;
  theme: Theme;
  fontSize: number;
  lineHeight: number;
  onClose: () => void;
}) {
  const [showChrome, setShowChrome] = useState(false);
  const pct = Math.round(book.progress * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: theme.bg }}
      onClick={() => setShowChrome((v) => !v)}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 py-4 transition-all duration-300"
        style={{
          opacity: showChrome ? 1 : 0,
          pointerEvents: showChrome ? "auto" : "none",
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.navBg,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm"
          style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}
        >
          <IconBack />
          Library
        </button>
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: theme.text, fontFamily: "Lora, serif" }}>{book.title}</p>
          <p className="text-xs" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{book.author}</p>
        </div>
        <p className="text-sm" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{pct}%</p>
      </div>

      {/* Reading content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className="mx-auto px-4 py-16"
          style={{ maxWidth: 640 }}
        >
          <p
            className="text-xs font-medium uppercase tracking-widest mb-8"
            style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}
          >
            Chapter One
          </p>
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              color: theme.text,
              fontFamily: "Lora, serif",
            }}
          >
            {SAMPLE_CHAPTER.split("\n\n").map((para, i) => (
              <p key={i} className="mb-6 indent-8">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div
        className="flex-shrink-0 transition-all duration-300"
        style={{
          opacity: showChrome ? 1 : 0,
          pointerEvents: showChrome ? "auto" : "none",
          borderTop: `1px solid ${theme.border}`,
          backgroundColor: theme.navBg,
          padding: "12px 32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <p className="text-xs w-8" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>{pct}%</p>
          <div className="flex-1 h-0.5" style={{ backgroundColor: theme.border }}>
            <div
              className="h-full"
              style={{ width: `${pct}%`, backgroundColor: theme.accent }}
            />
          </div>
          <p className="text-xs w-16 text-right" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
            p. {Math.round(book.progress * book.pages)} / {book.pages}
          </p>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif" }}>
          Tap anywhere to toggle controls
        </p>
      </div>
    </div>
  );
}

// ── Bottom Nav ───────────────────────────────────────────────────────────────

type NavTab = "library" | "search" | "settings";

function BottomNav({ active, onChange, theme }: { active: NavTab; onChange: (t: NavTab) => void; theme: Theme }) {
  const tabs = [
    { key: "library" as NavTab, label: "Library", Icon: IconLibrary },
    { key: "search" as NavTab, label: "Search", Icon: IconSearch },
    { key: "settings" as NavTab, label: "Settings", Icon: IconSettings },
  ];

  return (
    <nav
      className="flex-shrink-0 flex items-center justify-around py-3 px-8"
      style={{
        backgroundColor: theme.navBg,
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      {tabs.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex flex-col items-center gap-1 px-6 py-1 transition-all duration-150"
            style={{ color: isActive ? theme.accent : theme.textMuted }}
          >
            <Icon active={isActive} />
            <span className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("white");
  const [tab, setTab] = useState<NavTab>("library");
  const [openBook, setOpenBook] = useState<Book | null>(null);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.75);

  const theme = THEMES[themeKey];

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: theme.bg, transition: "background-color 0.3s, color 0.3s" }}
    >
      {/* Reader overlay */}
      {openBook && (
        <ReaderView
          book={openBook}
          theme={theme}
          fontSize={fontSize}
          lineHeight={lineHeight}
          onClose={() => setOpenBook(null)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {tab === "library" && (
          <LibraryView theme={theme} onOpenBook={setOpenBook} />
        )}
        {tab === "search" && (
          <SearchView theme={theme} onOpenBook={setOpenBook} />
        )}
        {tab === "settings" && (
          <SettingsView
            theme={theme}
            currentTheme={themeKey}
            onThemeChange={setThemeKey}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            lineHeight={lineHeight}
            onLineHeightChange={setLineHeight}
          />
        )}
      </div>

      {/* Nav */}
      <BottomNav active={tab} onChange={setTab} theme={theme} />
    </div>
  );
}
