import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Fortune Keeper - Daily Fortune Cookie",
  description:
    "Get your daily fortune cookie. One fortune per day to inspire, delight, and surprise you.",
};

export default function FortuneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
