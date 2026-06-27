import Image from 'next/image'

const PALETTE = [
  { label: 'Azul Polvo',   hex: '#8fa8bb' },
  { label: 'Azul Pizarra', hex: '#4a6578' },
  { label: 'Azul Noche',   hex: '#1a2b4a' },
  { label: 'Verde Olivo',  hex: '#5a7a3a' },
  { label: 'Verde Bosque', hex: '#2d4a2d' },
  { label: 'Vino',         hex: '#6b1a2e' },
  { label: 'Terracota',    hex: '#8b4513' },
  { label: 'Negro',        hex: '#1a1a1a' },
]

export default function DressCode() {
  return (
    <section id="dresscode" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
      <Image src="/assets/home/DressCode/background_beige.png" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-white/15" />

      <div className="relative z-10 w-full max-w-sm md:max-w-xl mx-auto text-center">
        <h2 className="font-engravers tracking-[0.5em] text-deep-space-blue text-3xl md:text-4xl leading-snug mb-7">
          DRESS CODE
        </h2>

        <p className="font-display italic text-deep-space-blue text-2xl mb-5">Formal elegante</p>

        <p className="font-sans font-light text-deep-space-blue-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
          Te pedimos vestir en tonos oscuros y tierra, vino, verde, azul o negro
        </p>

        <div className="flex flex-col gap-2 mb-8">
          <div>
            <p className="font-display font-semibold text-deep-space-blue text-base">Mujeres</p>
            <p className="font-sans font-light text-deep-space-blue-400 text-sm">Sin blancos, ni colores pastel.</p>
          </div>
          <div>
            <p className="font-display font-semibold text-deep-space-blue text-base">Hombres</p>
            <p className="font-sans font-light text-deep-space-blue-400 text-sm">Sin Azul marino</p>
          </div>
        </div>

        <p className="font-engravers tracking-[0.45em] text-deep-space-blue text-[10px] uppercase mb-2">
          Paleta Sugerida
        </p>
        <div className="w-10 h-px bg-deep-space-blue/25 mx-auto mb-7" />

        <div className="grid grid-cols-4 gap-x-4 gap-y-5 max-w-[280px] md:max-w-xs mx-auto">
          {PALETTE.map(({ label, hex }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow"
                style={{ backgroundColor: hex }}
              />
              <span className="font-sans text-[9px] text-deep-space-blue-400 text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
