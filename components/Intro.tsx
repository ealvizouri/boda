'use client'

import Image from 'next/image'
import DoubleChevronDown from './DoubleChevronDown'

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
    >
      <Image
        src="/assets/home/shared/background_crema.png"
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-12 md:max-w-5xl md:gap-16">
        {/* Photo collage */}
        <div className="w-full">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/assets/home/Intro/intro_desktop.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/home/Intro/intro.png"
              alt=""
              className="w-full"
            />
          </picture>
        </div>

        <div className="flex justify-center">
          <DoubleChevronDown
            hashtag="countdown"
            className="position static text-[#670626]/75 hover:text-[#670626]"
          />
        </div>
      </div>
    </section>
  )
}
