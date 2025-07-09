import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
