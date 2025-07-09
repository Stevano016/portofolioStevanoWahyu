import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Stevano Wahyu Al'fandi - Full-Stack Developer",
  description:
    "Passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Creating exceptional digital experiences through clean code and innovative solutions.",
  keywords: "full-stack developer, React, Next.js, Node.js, web development, JavaScript, TypeScript",
  authors: [{ name: "Stevano Wahyu Al'fandi" }],
  creator: "Stevano Wahyu Al'fandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Stevano Wahyu Al'fandi - Full-Stack Developer",
    description: "Passionate full-stack developer creating exceptional digital experiences.",
    siteName: "Stevano Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevano Wahyu Al'fandi - Full-Stack Developer",
    description: "Passionate full-stack developer creating exceptional digital experiences.",
    creator: "@stevano_dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
