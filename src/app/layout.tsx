import "~/styles/globals.css";

import { type Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Projects by Taslim Okunola",
  description: "Satisfying my curiosity by building - one project at a time with the help of AI",
  icons: [{ rel: "icon", url: "/sparkle-icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
