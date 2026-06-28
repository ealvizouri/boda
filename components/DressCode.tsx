import Image from 'next/image'

export default function DressCode() {
  return (
    <section
      id="dresscode"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
    >
      <Image
        src="/assets/home/DressCode/background_beige.png"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/15" />

      <div className="relative z-10 mx-auto w-full max-w-sm text-center text-[#4b4e40] md:max-w-xl">
        <h2 className="mb-7 font-quattro text-3xl leading-snug tracking-[0.5em] md:text-4xl">
          CÓDIGO DE VESTIMENTA
        </h2>

        <p className="mb-5 font-cormorant text-2xl italic">Formal elegante</p>

        <p className="mx-auto mb-6 max-w-xs font-mono text-sm leading-relaxed font-light">
          Te pedimos vestir en tonos oscuros y tierra, vino, verde, azul o negro
        </p>

        <div className="mb-12 flex flex-col gap-5">
          <div>
            <p className="font-cormorant text-base font-semibold">Mujeres</p>
            <p className="font-mono text-sm font-light">
              Sin blancos, ni colores pastel.
            </p>
          </div>
          <div>
            <p className="font-cormorant text-base font-semibold">Hombres</p>
            <p className="font-mono text-sm font-light">Sin Azul marino</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div>
            <Image
              src="/assets/home/DressCode/palette_title.png"
              alt="Paleta Sugerida"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
          <Image
            src="/assets/home/DressCode/palette_pt1.png"
            alt=""
            width={280}
            height={90}
            className="mb-2 h-auto w-full"
          />
          <Image
            src="/assets/home/DressCode/palette_pt2.png"
            alt=""
            width={280}
            height={90}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}
