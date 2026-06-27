import Image from 'next/image'

// Scattered photo placeholders — replace src values when real photos are added
const COLLAGE = [
  { style: { top: '0%',  left: '5%',  width: '46%', paddingBottom: '38%', rotate: '-3deg' } },
  { style: { top: '2%',  left: '54%', width: '42%', paddingBottom: '52%', rotate: '2deg'  } },
  { style: { top: '30%', left: '0%',  width: '38%', paddingBottom: '46%', rotate: '-5deg' } },
  { style: { top: '26%', left: '30%', width: '38%', paddingBottom: '48%', rotate: '1deg'  } },
  { style: { top: '22%', left: '58%', width: '38%', paddingBottom: '44%', rotate: '4deg'  } },
  { style: { top: '58%', left: '4%',  width: '36%', paddingBottom: '44%', rotate: '3deg'  } },
  { style: { top: '56%', left: '34%', width: '38%', paddingBottom: '46%', rotate: '-2deg' } },
  { style: { top: '60%', left: '62%', width: '36%', paddingBottom: '42%', rotate: '5deg'  } },
]

export default function OurStory() {
  return (
    <section id="story" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6">
      <Image src="/assets/home/shared/background_blue.png" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 w-full max-w-sm md:max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Photo collage */}
        <div className="relative w-full md:w-1/2 h-105 md:h-140 shrink-0">
          {/* Monogram medallion top-right */}
          <div className="absolute top-1 right-1 z-20 w-10 h-10">
            <Image src="/assets/home/shared/monograma.svg" alt="" width={40} height={40} className="opacity-75" />
          </div>

          {COLLAGE.map(({ style }, i) => (
            <div
              key={i}
              className="absolute bg-white/20 border border-white/30 shadow-lg"
              style={{
                top: style.top,
                left: style.left,
                width: style.width,
                paddingBottom: style.paddingBottom,
                transform: `rotate(${style.rotate})`,
              }}
            />
          ))}
          <p className="absolute inset-0 flex items-center justify-center font-sans text-white/30 text-xs">
            Fotos próximamente
          </p>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <p className="font-display italic text-white/80 text-2xl mb-3">capítulo a capítulo</p>
          <p className="font-sans text-white/55 text-xs tracking-[0.25em] uppercase mb-5">
            así llegamos aquí...
          </p>
          <h2 className="font-engravers text-brick-red text-4xl md:text-5xl tracking-widest leading-tight mb-5">
            NUESTRA<br />HISTORIA
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto md:mx-0 mb-5" />
          <p className="font-display italic text-white/70 text-xl md:text-2xl leading-snug">
            de mejores amigos,<br />a casa, a siempre...
          </p>
        </div>
      </div>
    </section>
  )
}
