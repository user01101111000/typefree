import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import { Suspense } from "react";
import LoadingPage from "@/components/ui/LoadingPage";
import Providers from "@/utils/providers";
import { siteMetadata } from "@/lib/siteMetadata";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const geistSans: NextFontWithVariable = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(siteMetadata.siteUrl),
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Type Free" />

        <link rel="canonical" href={siteMetadata.siteUrl} />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <main className="w-full min-h-dvh relative grid grid-rows-[auto_1fr] bg-[#1E1E1E]">
          <Providers>
            <Header />
            <Suspense fallback={<LoadingPage />}>
              {children}
            </Suspense>
          </Providers>
        </main>

      </body>
    </html >
  );
};

export default RootLayout;