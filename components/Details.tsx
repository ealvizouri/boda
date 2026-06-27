import { MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Details() {
  return (
    <section
      id="details"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    >
      <Image
        src="/assets/home/Details/background.jpeg"
        alt=""
        fill
        className="object-top-left md:object-cover"
      />

      {/* Card */}
      <div className="relative z-10 mx-auto w-full max-w-[320px] md:max-w-md">
        {/* Drop shadow beneath card */}
        <div className="absolute -left-21 z-0 h-full w-21">
          <Image
            src="/assets/home/Details/shadow.png"
            alt=""
            fill
            className="object-fill"
          />
        </div>

        {/* Wax seal overlapping top */}
        <div className="relative top-10 z-18 flex justify-center">
          <Image
            src="/assets/home/shared/sello_verde.png"
            alt=""
            width={80}
            height={80}
            className="drop-shadow-md"
          />
        </div>

        <div className="relative z-10 overflow-hidden px-8 pt-20 pb-10 shadow-2xl">
          <Image
            src="/assets/home/shared/background_paper.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="relative z-10">
            <h2 className="text-center font-quattro text-3xl tracking-[0.2rem] text-[#4b4e40]">
              RECEPCIÓN
            </h2>

            {/* Venue sketch */}
            <div className="relative h-52 w-full overflow-hidden md:h-96">
              <Image
                src="/assets/home/Details/sketch_salon.png"
                alt="Salón Evangelina"
                fill
                className="object-fill"
              />
            </div>

            <p className="mb-6 text-center font-script text-xl leading-tight text-deep-space-blue">
              Porque el amor siempre
              <br />
              encuentra el camino...
            </p>

            <div className="mx-auto mb-6 h-px w-14 bg-deep-space-blue/20" />

            <p className="mb-6 text-center font-sans text-sm leading-relaxed font-light text-deep-space-blue-400">
              Con el corazón lleno de ilusión, deseamos compartir con ustedes el
              inicio de nuestra nueva etapa el día:
            </p>

            <p className="mb-1 text-center font-engravers text-[10px] tracking-[0.3em] text-deep-space-blue uppercase">
              Sábado
            </p>
            <p className="mb-6 text-center font-display text-2xl font-light text-deep-space-blue">
              17 &bull; Octubre &bull; 2026
            </p>

            <p className="mb-1 text-center font-sans text-sm text-deep-space-blue-400">
              Ceremonia simbólica a las:
            </p>
            <p className="mb-1 text-center font-display text-4xl leading-none font-light text-deep-space-blue">
              5:00 PM
            </p>
            <p className="mb-7 text-center font-sans text-sm text-deep-space-blue">
              en el <strong>Salón Evangelina</strong>
            </p>

            <a
              href="https://maps.google.com/?q=Negrito+Poeta+84,+Tenencia+Sta+Maria+de+Guido,+Morelia,+Michoacan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-center gap-1.5 text-brick-red transition-colors hover:text-molten-lava"
            >
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span className="text-center font-sans text-xs leading-relaxed underline">
                Negrito Poeta 84, Tenencia Sta Maria de Guido, Morelia, Mich.
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
