import type { Metadata } from 'next'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mariano & Jackie — 12 de septiembre de 2026',
  description: 'Te invitamos a celebrar nuestra boda el 12 de septiembre de 2026.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  )
}
