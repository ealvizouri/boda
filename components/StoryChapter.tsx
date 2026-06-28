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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <Image src={background} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/15" />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-8 md:max-w-4xl md:gap-14 ${flip ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* Paper card with illustration */}
        <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
          <h2 className="mb-1 font-antarisk text-5xl text-white drop-shadow md:text-6xl">
            Capítulo {number}
          </h2>
          <p className="mb-5 font-cormorant text-lg text-white/75 italic">
            {subtitle}
          </p>

          {/* Torn-paper frame + illustration */}
          <div className="relative w-full">
            <Image
              src={papel}
              alt=""
              width={340}
              height={260}
              className="h-auto w-full"
              unoptimized
            />
            {animation && (
              <div className="absolute inset-[7%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={animation}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Story text */}
        <div className="text-center md:w-7/12 md:text-left">
          <h3 className="mb-4 font-cormorant text-xl font-semibold text-white">
            {heading}
          </h3>
          <p className="mb-4 font-mono text-sm leading-relaxed font-light text-white/80">
            {body}
          </p>
          {boldLine && (
            <p className="mb-4 font-cormorant text-base leading-snug font-semibold text-white italic">
              {boldLine}
            </p>
          )}
          {afterBold && (
            <p className="font-mono text-sm leading-relaxed font-light text-white/80">
              {afterBold}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
