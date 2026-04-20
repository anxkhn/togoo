import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where to Go — Group scheduling, made easy",
  description: "Find the perfect time and place for your group meetup. Collect availability, gather preferences, and get smart recommendations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
