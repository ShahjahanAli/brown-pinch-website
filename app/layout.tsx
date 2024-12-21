import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartContext'
import ProgressBar from './components/ProgressBar'
import { CheckoutProvider } from './context/CheckoutContext'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brows Pinch - Artisan Cakes & Pastries',
  description: 'Handcrafted cakes and pastries made with love',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckoutProvider>
          <CartProvider>
            <ProgressBar />
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
            <Footer />
          </CartProvider>
        </CheckoutProvider>
      </body>
    </html>
  )
} 