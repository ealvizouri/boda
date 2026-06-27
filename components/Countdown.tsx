'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const WEDDING_DATE = new Date('2026-10-17T17:00:00')

interface Countdown { days: number; hours: number; minutes: number }

function getCountdown(): Countdown {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  }
}

export default function Countdown() {
  const [cd, setCd] = useState<Countdown>({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    setCd(getCountdown())
    const id = setInterval(() => setCd(getCountdown()), 60_000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: cd.days, label: 'días' },
    { value: cd.hours, label: 'horas' },
    { value: cd.minutes, label: 'minutos' },
  ]

  return (
    <section id="countdown" className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <Image src="/assets/home/shared/background_red.png" alt="" fill className="object-cover" />

      {/* Paper card */}
      <div className="relative z-10 w-full max-w-[320px] md:max-w-2xl mx-auto bg-[#fdf8f2] shadow-2xl pb-10">
        {/* Wax seal overlapping top edge */}
        <div className="flex justify-center -mt-9 mb-6 relative z-10">
          <Image src="/assets/home/shared/sello_verde.png" alt="" width={72} height={72} className="drop-shadow-md" />
        </div>

        <div className="px-8 md:px-14">
          <p className="font-engravers text-center tracking-[0.55em] text-[10px] text-deep-space-blue-400 uppercase mb-5">
            Faltan
          </p>

          {/* Countdown row */}
          <div className="flex items-start justify-center mb-8">
            {units.map(({ value, label }, i) => (
              <div key={label} className="flex items-start">
                {i > 0 && (
                  <div className="w-px bg-deep-space-blue/20 mx-4 md:mx-6" style={{ height: '52px', marginTop: '4px' }} />
                )}
                <div className="flex flex-col items-center min-w-[58px] md:min-w-[72px]">
                  <span className="font-display text-5xl md:text-6xl font-light text-deep-space-blue leading-none">
                    {value}
                  </span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-deep-space-blue-400 mt-1">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Photo + text — stack on mobile, side-by-side on desktop */}
          <div className="md:flex md:gap-8 md:items-start">
            <div className="relative w-full md:w-1/2 aspect-[4/3] mb-7 md:mb-0 overflow-hidden flex-shrink-0">
              <Image
                src="/assets/home/Countdown/foto_reloj_anillo.jpg"
                alt="Reloj y anillo"
                fill
                className="object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="font-display italic text-center md:text-left text-deep-space-blue text-xl md:text-2xl leading-snug mb-5">
                ¡Preparen sus mejores pasos de baile para nuestro gran día!
              </p>
              <div className="w-16 h-px bg-brick-red mx-auto md:mx-0 mb-5" />
              <p className="font-sans font-light text-center md:text-left text-deep-space-blue-400 text-sm leading-relaxed">
                Con inmensa alegría, queremos invitarlos a celebrar el inicio de nuestro capítulo más bonito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
