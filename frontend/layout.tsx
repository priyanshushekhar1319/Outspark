import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Outspark – LinkedIn Profile Review',
  description: 'Get a professional LinkedIn profile review',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
