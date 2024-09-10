import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Drawer from '@/components/Drawer/Drawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bit Todo App',
  description: 'An application to maintain todo tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
       {children}
      </body>
    </html>
  )
}
