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
        <div className="absolute top-20 -left-21 z-0 h-[calc(100%-80px)] w-21">
          <Image
            src="/assets/home/shared/shadow.png"
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

            <p className="mb-6 text-center font-antarisk text-3xl leading-tight tracking-[0.2rem] text-[#4b4e40]/75">
              Porque el amor siempre
              <br />
              encuentra el camino...
            </p>

            <div className="mx-auto mb-6 h-[0.5px] w-full bg-[#7d7e74]" />

            <div className="font-quattro text-[#4b4e40]">
              <p className="mb-6 text-center text-xs leading-3.5 font-extralight tracking-widest">
                Con el corazón lleno de ilusión, deseamos compartir con ustedes
                el inicio de nuestra nueva etapa el día:
              </p>

              <p className="mb-1 text-center text-[10px] font-bold tracking-[0.2rem] uppercase">
                Sábado
              </p>
              <p className="mb-6 text-center text-2xl font-bold">
                17&bull;Octubre&bull;2026
              </p>

              <p className="mb-1 text-center text-xs font-light tracking-widest">
                Ceremonia simbólica a las:
              </p>
              <p className="mb-4 text-center text-xl leading-none font-bold">
                5:00 PM
              </p>
              <p className="mb-1 text-center text-xs font-light tracking-widest">
                recepción:
              </p>
              <p className="mb-4 text-center text-xl leading-none font-bold">
                6:10 PM
              </p>
              <p className="mb-7 text-center text-sm tracking-widest">
                en el <strong>Salón Evangelina</strong>
              </p>

              <a
                href="https://maps.app.goo.gl/zX9az9QHZqYrYchZ6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 font-mono hover:font-bold"
              >
                <MapPin size={16} className="shrink-0" />
                <span className="text-center font-mono text-xs leading-relaxed underline">
                  Negrito Poeta 84, Tenencia Sta Maria de Guido, Morelia, Mich.
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
