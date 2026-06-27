import Image from 'next/image'
import { MapPin } from 'lucide-react'

export default function Details() {
  return (
    <section id="details" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background — outdoor venue photo not yet provided; using neutral fallback */}
      <div className="absolute inset-0 bg-[#7a7a6a]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[320px] md:max-w-md mx-auto">
        {/* Wax seal overlapping top */}
        <div className="flex justify-center -mb-5 relative z-10">
          <Image src="/assets/home/shared/sello_verde.png" alt="" width={56} height={56} className="drop-shadow-md" />
        </div>

        <div className="bg-[#f5f0e8] shadow-2xl px-8 py-10">
          <h2 className="font-engravers text-center tracking-[0.4em] text-deep-space-blue text-2xl mb-7">
            RECEPCIÓN
          </h2>

          {/* Venue sketch */}
          <div className="relative w-full h-36 mb-6 overflow-hidden">
            <Image
              src="/assets/home/Details/sketch_salon.png"
              alt="Salón Evangelina"
              fill
              className="object-contain"
            />
          </div>

          <p className="font-script text-center text-deep-space-blue text-xl leading-tight mb-6">
            Porque el amor siempre<br />encuentra el camino...
          </p>

          <div className="w-14 h-px bg-deep-space-blue/20 mx-auto mb-6" />

          <p className="font-sans font-light text-center text-deep-space-blue-400 text-sm leading-relaxed mb-6">
            Con el corazón lleno de ilusión, deseamos compartir con ustedes el inicio de nuestra nueva etapa el día:
          </p>

          <p className="font-engravers text-center tracking-[0.3em] text-deep-space-blue text-[10px] uppercase mb-1">
            Sábado
          </p>
          <p className="font-display text-center text-deep-space-blue text-2xl font-light mb-6">
            17 &bull; Octubre &bull; 2026
          </p>

          <p className="font-sans text-center text-deep-space-blue-400 text-sm mb-1">
            Ceremonia simbólica a las:
          </p>
          <p className="font-display text-center text-deep-space-blue text-4xl font-light leading-none mb-1">
            5:00 PM
          </p>
          <p className="font-sans text-center text-deep-space-blue text-sm mb-7">
            en el <strong>Salón Evangelina</strong>
          </p>

          <a
            href="https://maps.google.com/?q=Negrito+Poeta+84,+Tenencia+Sta+Maria+de+Guido,+Morelia,+Michoacan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-center gap-1.5 text-brick-red hover:text-molten-lava transition-colors"
          >
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span className="font-sans text-xs underline text-center leading-relaxed">
              Negrito Poeta 84, Tenencia Sta Maria de Guido, Morelia, Mich.
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
