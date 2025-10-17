import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Projects by Taslim Okunola",
  description: "Satisfying my curiosity by building - one project at a time",
  icons: [{ rel: "icon", url: "/sparkle-icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
