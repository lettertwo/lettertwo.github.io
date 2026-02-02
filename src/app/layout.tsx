import type { Metadata } from "next";
import ScrollupBar from "@/components/ScrollupBar";
import ThemeToggle, { THEME_BOOTSTRAP_SCRIPT } from "@/components/ThemeToggle";
import localFont from "next/font/local";

const PlexSans = localFont({
  variable: "--font-plex-sans",
  src: "../../node_modules/@ibm/plex-sans-variable/fonts/split/woff2/IBM Plex Sans Var-Roman-Latin1.woff2",
  fallback: ["'Helvetica Neue'", "Arial", "sans-serif"],
  display: "swap",
  weight: "100 700",
});

import "./globals.css";

export const metadata: Metadata = {
  title: "lettertwo dot dev",
  description: "the place where i put that thing that one time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={PlexSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body>
        <ScrollupBar>
          <ThemeToggle />
        </ScrollupBar>
        {children}
      </body>
    </html>
  );
}
