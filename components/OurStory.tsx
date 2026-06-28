import Image from 'next/image'

// Scattered photo placeholders — replace src values when real photos are added
const COLLAGE = [
  {
    style: {
      top: '0%',
      left: '5%',
      width: '46%',
      paddingBottom: '38%',
      rotate: '-3deg',
    },
  },
  {
    style: {
      top: '2%',
      left: '54%',
      width: '42%',
      paddingBottom: '52%',
      rotate: '2deg',
    },
  },
  {
    style: {
      top: '30%',
      left: '0%',
      width: '38%',
      paddingBottom: '46%',
      rotate: '-5deg',
    },
  },
  {
    style: {
      top: '26%',
      left: '30%',
      width: '38%',
      paddingBottom: '48%',
      rotate: '1deg',
    },
  },
  {
    style: {
      top: '22%',
      left: '58%',
      width: '38%',
      paddingBottom: '44%',
      rotate: '4deg',
    },
  },
  {
    style: {
      top: '58%',
      left: '4%',
      width: '36%',
      paddingBottom: '44%',
      rotate: '3deg',
    },
  },
  {
    style: {
      top: '56%',
      left: '34%',
      width: '38%',
      paddingBottom: '46%',
      rotate: '-2deg',
    },
  },
  {
    style: {
      top: '60%',
      left: '62%',
      width: '36%',
      paddingBottom: '42%',
      rotate: '5deg',
    },
  },
]

export default function OurStory() {
  return (
    <section
      id="story"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <Image
        src="/assets/home/shared/background_blue.png"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-12 md:max-w-5xl md:flex-row md:gap-16">
        {/* Photo collage */}
        <div className="relative h-105 w-full shrink-0 md:h-140 md:w-1/2">
          {/* Monogram medallion top-right */}
          <div className="absolute top-1 right-1 z-20 h-10 w-10">
            <Image
              src="/assets/home/shared/monograma.svg"
              alt=""
              width={40}
              height={40}
              className="opacity-75"
            />
          </div>

          {COLLAGE.map(({ style }, i) => (
            <div
              key={i}
              className="absolute border border-white/30 bg-white/20 shadow-lg"
              style={{
                top: style.top,
                left: style.left,
                width: style.width,
                paddingBottom: style.paddingBottom,
                transform: `rotate(${style.rotate})`,
              }}
            />
          ))}
          <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/30">
            Fotos próximamente
          </p>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <p className="mb-3 font-cormorant text-2xl text-white/80 italic">
            capítulo a capítulo
          </p>
          <p className="mb-5 font-mono text-xs tracking-[0.25em] text-white/55 uppercase">
            así llegamos aquí...
          </p>
          <h2 className="mb-5 font-engravers text-4xl leading-tight tracking-widest text-brick-red md:text-5xl">
            NUESTRA
            <br />
            HISTORIA
          </h2>
          <div className="mx-auto mb-5 h-px w-16 bg-white/30 md:mx-0" />
          <p className="font-cormorant text-xl leading-snug text-white/70 italic md:text-2xl">
            de mejores amigos,
            <br />a casa, a siempre...
          </p>
        </div>
      </div>
    </section>
  )
}
