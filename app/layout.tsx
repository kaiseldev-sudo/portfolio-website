import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayson Reales | Web Developer",
  description: "Jayson Reales is a passionate Web Developer specializing in modern, responsive, and user-friendly websites.",
  icons: {
    icon: '/jayson.png',
  },
  openGraph: {
    title: 'Jayson Reales | Web Developer',
    description: "Jayson Reales is a passionate Web Developer specializing in modern, responsive, and user-friendly websites.",
    url: 'https://jaysonreales.vercel.app/',
    siteName: 'Jayson Reales | Web Developer',
    images: [
      {
        url: 'https://jaysonreales.vercel.app/jayson_og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/jayson.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
