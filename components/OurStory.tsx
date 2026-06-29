import Image from 'next/image'
import DoubleChevronDown from './DoubleChevronDown'

export default function OurStory() {
  return (
    <section
      id="story"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <Image
        src="/assets/home/shared/background_crema.png"
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-12 md:max-w-5xl md:flex-row md:gap-16">
        {/* Photo collage */}
        <div className="relative w-full shrink-0 md:w-1/2">
          <Image
            src="/assets/home/OurStory/collage.png"
            alt=""
            width={400}
            height={400}
            className="w-full!"
          />
        </div>

        {/* Text */}
        <div className="flex w-full flex-col items-center text-center md:text-left">
          <h2 className="mb-5 font-cormorant text-4xl leading-tight tracking-widest text-[#790c30] md:text-5xl">
            NUESTRA
            <br />
            HISTORIA
          </h2>
          <div className="flex justify-center">
            <DoubleChevronDown
              hashtag="chapter-one"
              className="position static text-[#670626]/75 hover:text-[#670626]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
