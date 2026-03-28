import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Outspark – LinkedIn Profile Review',
  description: 'Get a professional LinkedIn profile review and land your dream job',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>{children}</body>
    </html>
  )
}
