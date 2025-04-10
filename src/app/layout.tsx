import type { Metadata } from "next";
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

import chickens from '../data/chickens.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barry's Egguisite -- Chicken Brood",
  description: "Learn more about the chickens on the Barry's Egguisite Farm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="content-wrapper">
          <h1>Barry&apos;s Egguisite Chicken Brood!</h1>
          <div className="showcase-wrapper">
            <ul className="showcase-items">
              {chickens.map((chick, index) => {
                return (
                  <li key={index} className="showcase-item">
                    <Link href={`/${chick.name}`}>
                    {chick.name}
                    {chick.breed && <small style={{display:'block'}}>{chick.breed}</small>}
                  </Link>  
                  </li>
                )
              })}
            </ul>
          </div>
          <hr />
          <div className="showcase-stage">
          {children}
          </div>
        </div>
      </body>
    </html>
  );
}
