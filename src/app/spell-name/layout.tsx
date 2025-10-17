import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Spell your name with NATO alphabets",
  description:
    "Spell clearly over the phone using the NATO phonetic alphabet. Convert names and words instantly.",
  openGraph: {
    title: "Spell your name with NATO alphabets",
    description:
      "Spell clearly over the phone using the NATO phonetic alphabet. Convert names and words instantly.",
    type: "website",
    siteName: "nownow.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spell your name with NATO alphabets",
    description:
      "Spell clearly over the phone using the NATO phonetic alphabet. Convert names and words instantly.",
  },
};

export default function SpellNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
