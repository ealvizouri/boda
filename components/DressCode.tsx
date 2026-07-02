import {
  DRESS_CODE_BACKGROUND,
  DRESS_CODE_PALETTE_PT1,
  DRESS_CODE_PALETTE_PT2,
  DRESS_CODE_PALETTE_TITLE,
} from '@/lib/images'
import Image from 'next/image'

export default function DressCode() {
  return (
    <section
      id="dresscode"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 font-quattro"
    >
      <Image src={DRESS_CODE_BACKGROUND} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-white/15" />

      <div className="relative z-10 mx-auto w-full max-w-sm text-center text-[#4b4e40] md:max-w-xl">
        <h2 className="mb-7 text-3xl leading-snug tracking-[0.5em] md:text-4xl">
          CÓDIGO DE VESTIMENTA
        </h2>

        <p className="mb-5">Formal elegante</p>

        <p className="mx-auto mb-6 max-w-xs text-sm leading-relaxed font-light">
          Agradecemos su vestimenta en tonos oscuros e inspirados en la
          naturaleza: colores tierra, vino, verde, azul o negro.
        </p>

        <div className="mb-12 flex flex-col gap-5">
          <div>
            <p className="text-base font-semibold">Damas</p>
            <p className="text-sm font-light">
              Agradecemos su asistencia en vestido largo,{' '}
              <span className="font-bold">
                evitando el color blanco, rojo, beige y los tonos pastel
              </span>
              .
            </p>
          </div>
          <div>
            <p className="text-base font-semibold">Caballeros</p>
            <p className="text-sm font-light">
              Agradecemos su asistencia en traje completo,{' '}
              <span className="font-bold">evitando el color azul marino</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div>
            <Image
              src={DRESS_CODE_PALETTE_TITLE}
              alt="Paleta Sugerida"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
          <Image
            src={DRESS_CODE_PALETTE_PT1}
            alt=""
            width={280}
            height={90}
            className="mb-2 h-auto w-full"
          />
          <Image
            src={DRESS_CODE_PALETTE_PT2}
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
