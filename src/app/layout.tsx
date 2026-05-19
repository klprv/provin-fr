import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://provin.fr"),
  title: {
    default: "Killian Provin — Cryptography Researcher",
    template: "%s — Killian Provin",
  },
  description: "Killian Provin — cryptography researcher based in Paris.",
  authors: [{ name: "Killian Provin", url: "https://provin.fr" }],
  creator: "Killian Provin",
  keywords: ["Killian Provin", "cryptography", "researcher", "Paris"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://provin.fr",
    siteName: "Killian Provin",
    title: "Killian Provin — Cryptography Researcher",
    description: "Cryptography researcher based in Paris.",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Killian Provin" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Killian Provin — Cryptography Researcher",
    description: "Cryptography researcher based in Paris.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://provin.fr" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}