import { WED_DATE_FULL, WED_DATE_NORMAL } from '@/lib/constants'
import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Cormorant_SC,
  Newsreader,
  Quattrocento,
  Raleway,
  Roboto_Mono,
} from 'next/font/google'
import localFont from 'next/font/local'
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

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-sc',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const quattrocento = Quattrocento({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quattrocento',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

const signature = localFont({
  src: './fonts/Antariskalia Signature.otf',
  variable: '--font-antariskalia',
  display: 'swap',
})

const courier = localFont({
  src: './fonts/cour.ttf',
  variable: '--font-cour',
  display: 'swap',
})

const engravers = localFont({
  src: './fonts/EngraversGothic BT Regular.ttf',
  variable: '--font-engravers-gothic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Mariano & Jackie — ${WED_DATE_NORMAL}`,
  description: `Te invitamos a celebrar nuestra boda el ${WED_DATE_FULL}.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={[
        cormorant.variable,
        raleway.variable,
        cormorantSC.variable,
        newsreader.variable,
        quattrocento.variable,
        robotoMono.variable,
        signature.variable,
        courier.variable,
        engravers.variable,
      ].join(' ')}
    >
      <body>{children}</body>
    </html>
  )
}
