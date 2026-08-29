import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: { default: "CPS LMS — Learn Without Limits", template: "%s | CPS LMS" },
  description: "CPS Learning Management System — Professional online learning platform for students, instructors, and organizations.",
  keywords: ["LMS", "online learning", "courses", "e-learning", "CPS LMS"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
