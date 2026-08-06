import * as React from "react";
import { Youtube } from "lucide-react";

/** Simple TikTok glyph — lucide-react has no official TikTok icon. */
function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.16-1.4V15.6a5.4 5.4 0 1 1-4.6-5.34v2.75a2.68 2.68 0 1 0 1.88 2.56V2h2.7a4.28 4.28 0 0 0 3.9 4.24z" />
    </svg>
  );
}

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@your-channel", Icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@your-account", Icon: TiktokIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="container flex flex-col items-center gap-8 text-center">
        <p className="font-display text-lg tracking-widest text-ink-light/90">
          Love Live! Trance
        </p>

        <nav aria-label="ソーシャルリンク" className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-aurora-ice/20 text-ink-soft transition-all duration-300 hover:border-aurora-ice/60 hover:text-aurora-ice hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>

        <div className="section-divider max-w-xs" />

        <p className="font-jp text-xs tracking-wide text-ink-soft/50">
          &copy; {year} Love Live! Trance Project. All rights reserved.
        </p>
        <p className="max-w-md font-jp text-[11px] leading-relaxed text-ink-soft/35">
          本サイトは非公式のファン制作リミックス作品を紹介するものです。「ラブライブ！」および関連の商標・著作権は各権利者に帰属します。
        </p>
      </div>
    </footer>
  );
}
