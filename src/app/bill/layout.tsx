import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator",
  description:
    "Calculate tips from your bill. Support for subtotal and total amounts with customizable tip percentages.",
  openGraph: {
    title: "Tip Calculator",
    description:
      "Calculate tips from your bill. Support for subtotal and total amounts with customizable tip percentages.",
    type: "website",
    siteName: "nownow.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator",
    description:
      "Calculate tips from your bill. Support for subtotal and total amounts with customizable tip percentages.",
  },
};

export default function TipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
