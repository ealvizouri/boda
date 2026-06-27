import Image from 'next/image'
import { Sparkles, GlassWater, UtensilsCrossed, Music, Car } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Event {
  time: string
  label: string
  Icon: LucideIcon
}

const EVENTS: Event[] = [
  { time: '5:00 PM', label: 'Ceremonia',  Icon: Sparkles },
  { time: '6:10 PM', label: 'Recepción',  Icon: GlassWater },
  { time: '6:50 PM', label: 'Cena',       Icon: UtensilsCrossed },
  { time: '8:55 PM', label: '¡A bailar!', Icon: Music },
  { time: '3:00 AM', label: 'Bye bye',    Icon: Car },
]

export default function Programa() {
  return (
    <section id="programa" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      {/* Dark venue background — photo not yet provided */}
      <div className="absolute inset-0 bg-[#1e1e1e]" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-[320px] md:max-w-lg mx-auto">
        <h2 className="font-engravers text-center tracking-[0.5em] text-white text-2xl mb-7">
          PROGRAMA
        </h2>

        {/* Red wax seal */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-[#8b1a1a] flex items-center justify-center shadow-lg ring-2 ring-[#6b1212]">
            <Image src="/assets/home/shared/monograma.svg" alt="" width={28} height={28} className="opacity-80 invert" />
          </div>
        </div>

        {/* Timeline card */}
        <div className="bg-white/95 shadow-2xl px-6 py-8">
          <div className="relative flex flex-col gap-5">
            {/* Vertical center line */}
            <div className="absolute left-1/2 top-3 bottom-3 w-px bg-gray-300 -translate-x-1/2" />

            {EVENTS.map(({ time, label, Icon }, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={time} className="relative flex items-center min-h-13">
                  {/* LEFT SIDE */}
                  <div className="flex-1 flex justify-end pr-5 md:pr-6">
                    {/* Mobile: always icon on left */}
                    {/* Desktop: even=icon, odd=text */}
                    <div className="md:hidden text-deep-space-blue-300">
                      <Icon size={28} strokeWidth={1.25} />
                    </div>
                    <div className="hidden md:flex items-center">
                      {isEven
                        ? <Icon size={30} strokeWidth={1.25} className="text-deep-space-blue-300" />
                        : (
                          <div className="text-right">
                            <p className="font-sans font-semibold text-deep-space-blue text-sm">{time}</p>
                            <p className="font-sans text-deep-space-blue-400 text-xs">{label}</p>
                          </div>
                        )
                      }
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0 z-10" />

                  {/* RIGHT SIDE */}
                  <div className="flex-1 pl-5 md:pl-6">
                    {/* Mobile: always text on right */}
                    <div className="md:hidden">
                      <p className="font-sans font-semibold text-deep-space-blue text-sm">{time}</p>
                      <p className="font-sans text-deep-space-blue-400 text-xs">{label}</p>
                    </div>
                    <div className="hidden md:flex items-center">
                      {isEven
                        ? (
                          <div>
                            <p className="font-sans font-semibold text-deep-space-blue text-sm">{time}</p>
                            <p className="font-sans text-deep-space-blue-400 text-xs">{label}</p>
                          </div>
                        )
                        : <Icon size={30} strokeWidth={1.25} className="text-deep-space-blue-300" />
                      }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
