import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Togoo — Plan group meetups effortlessly",
  description: "Find the perfect time and place for your group. Collect availability, gather preferences, and get smart recommendations.",
  openGraph: {
    siteName: "Togoo",
    type: "website",
  },
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
