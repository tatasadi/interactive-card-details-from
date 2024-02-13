import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Reference from "@/components/Reference"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Frontend Mentor Challenge",
  description: "A Challenge from Frontend Mentor!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={`${spaceGrotesk.className} flex min-h-screen flex-col items-center`}
      >
        {children}
        <Reference />
      </body>
    </html>
  )
}
