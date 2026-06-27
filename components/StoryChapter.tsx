import Image from 'next/image'

export interface StoryChapterProps {
  number: number
  subtitle: string
  heading: string
  body: string
  boldLine?: string
  afterBold?: string
  background: string
  animation: string | null
  papel: string
  flip?: boolean
}

export default function StoryChapter({
  number,
  subtitle,
  heading,
  body,
  boldLine,
  afterBold,
  background,
  animation,
  papel,
  flip = false,
}: StoryChapterProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
      <Image src={background} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/15" />

      <div
        className={`relative z-10 w-full max-w-sm md:max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-14
          ${flip ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* Paper card with illustration */}
        <div className="w-full md:w-5/12 shrink-0 flex flex-col items-center">
          <h2 className="font-script text-white text-5xl md:text-6xl drop-shadow mb-1">
            Capítulo {number}
          </h2>
          <p className="font-display italic text-white/75 text-lg mb-5">{subtitle}</p>

          {/* Torn-paper frame + illustration */}
          <div className="relative w-full">
            <Image
              src={papel}
              alt=""
              width={340}
              height={260}
              className="w-full h-auto"
              unoptimized
            />
            {animation && (
              <div className="absolute inset-[7%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={animation}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Story text */}
        <div className="md:w-7/12 text-center md:text-left">
          <h3 className="font-display font-semibold text-white text-xl mb-4">{heading}</h3>
          <p className="font-sans font-light text-white/80 text-sm leading-relaxed mb-4">{body}</p>
          {boldLine && (
            <p className="font-display italic font-semibold text-white text-base leading-snug mb-4">
              {boldLine}
            </p>
          )}
          {afterBold && (
            <p className="font-sans font-light text-white/80 text-sm leading-relaxed">{afterBold}</p>
          )}
        </div>
      </div>
    </section>
  )
}
