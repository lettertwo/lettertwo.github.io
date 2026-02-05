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

const PLAUSIBLE_BOOTSTRAP_SCRIPT = `
window.plausible=window.plausible||function()
{(plausible.q = plausible.q || []).push(arguments)}
,plausible.init=plausible.init||function(i){(plausible.o = i || {})};
plausible.init()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={PlexSans.variable}>
      <head>
        <script
          async
          src="https://plausible.io/js/pa-jmo6mrcZ5UDf62u3kGNHO.js"
        ></script>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{ __html: PLAUSIBLE_BOOTSTRAP_SCRIPT }}
        />
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
