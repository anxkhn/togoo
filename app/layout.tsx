import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Togoo | Pick a meetup time without the back-and-forth",
  description: "Send one link, collect everyone's availability and preferences, and choose the best meetup time faster.",
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
