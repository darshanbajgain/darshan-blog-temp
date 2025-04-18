import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "./prism.css"
import { ThemeProvider } from "@/theme/theme-provider"
import Navbar from "@/components/main/Navbar"
import Footer from "@/components/main/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Next.js Blog Template",
  description: "A modern blog template built with Next.js, TypeScript, and Tailwind CSS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="color-scheme" content="light dark" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-backgroundPrimary`}>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>

  )
}

