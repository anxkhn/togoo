import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Togoo | Get your group to a confirmed plan faster",
  description: "Send one link, collect availability and preferences, and let Togoo surface the best time for your group to meet.",
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
