'use client'

import { BG_CREMA, INTRO_DESKTOP, INTRO_MOBILE } from '@/lib/images'
import Image from 'next/image'
import DoubleChevronDown from './DoubleChevronDown'

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-0 py-20"
    >
      <Image src={BG_CREMA} alt="" fill className="object-cover" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-12 md:max-w-5xl md:gap-16">
        {/* Photo collage */}
        <div className="w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={INTRO_DESKTOP} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INTRO_MOBILE} alt="" className="w-full" />
          </picture>
        </div>

        <div className="flex w-full justify-center">
          <DoubleChevronDown
            hashtag="countdown"
            className="static bottom-0 left-0 z-0 translate-0 text-[#670626]/75 hover:text-[#670626]"
          />
        </div>
      </div>
    </section>
  )
}
