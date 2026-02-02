import type { Metadata } from "next";
import ScrollupBar from "@/components/ScrollupBar";
import ThemeToggle, { THEME_BOOTSTRAP_SCRIPT } from "@/components/ThemeToggle";

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
    <html suppressHydrationWarning lang="en">
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
