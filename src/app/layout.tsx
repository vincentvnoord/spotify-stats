import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify stats",
  description: "Spotify stats is a web app that shows your top tracks and artists on Spotify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="w-full flex justify-center h-dvh" lang="en">
      <body className={`${inter.className} bg-black flex text-white justify-center h-dvh w-full scrollbar-thin scrollbar-webkit scrollbar`}>
        {children}
      </body>
    </html>
  );
}
