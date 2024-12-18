import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { PredictionHistoryProvider } from '../contexts/PredictionHistoryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js with Clerk and Google Auth',
  description: 'A simple Next.js app with Clerk authentication using Google',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <PredictionHistoryProvider>
            {children}
          </PredictionHistoryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

