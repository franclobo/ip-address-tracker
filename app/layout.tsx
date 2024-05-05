import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import StoreProvider from './storeProvider';

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IP Address Tracker",
  description: "Track any IP address or domain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          />
        </noscript>
      </head>
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
        <script
          async
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />
      </body>
    </html>
  );
}
