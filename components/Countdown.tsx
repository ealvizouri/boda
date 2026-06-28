'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2026-10-17T17:00:00')

interface Countdown {
  days: number
  hours: number
  minutes: number
}

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
    <section
      id="countdown"
      className="relative flex min-h-screen items-center justify-center px-4 py-20"
    >
      <Image
        src="/assets/home/shared/background_red.png"
        alt=""
        fill
        className="object-cover"
      />

      {/* Paper card */}
      <div className="relative z-10 mx-auto w-full max-w-[320px] bg-[#fdf8f2] pb-10 shadow-2xl md:max-w-2xl">
        {/* Drop shadow beneath card */}
        <div className="absolute -left-21 z-0 h-full w-21">
          <Image
            src="/assets/home/shared/shadow.png"
            alt=""
            fill
            className="object-fill"
          />
        </div>

        {/* Wax seal overlapping top edge */}
        <div className="relative z-10 -mt-9 mb-6 flex justify-center">
          <Image
            src="/assets/home/shared/sello_verde.png"
            alt=""
            width={72}
            height={72}
            className="drop-shadow-md"
          />
        </div>

        <div className="px-8 md:px-14">
          <p className="mb-5 text-center font-cormorant text-[10px] tracking-[0.55em] text-[#790c30] uppercase">
            Faltan
          </p>

          {/* Countdown row */}
          <div className="mb-8 flex items-start justify-center">
            {units.map(({ value, label }, i) => (
              <div key={label} className="flex items-start text-[#790c30]">
                {i > 0 && (
                  <div
                    className="mx-4 w-px bg-[#790c30] md:mx-6"
                    style={{ height: '52px', marginTop: '4px' }}
                  />
                )}
                <div className="flex min-w-14.5 flex-col items-center md:min-w-18">
                  <span className="font-cormorant text-5xl leading-none font-light md:text-6xl">
                    {value}
                  </span>
                  <span className="mt-1 font-mono text-[10px] tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Photo + text — stack on mobile, side-by-side on desktop */}
          <div className="md:flex md:items-start md:gap-8">
            <div className="relative mb-7 aspect-4/3 w-full shrink-0 overflow-hidden md:mb-0 md:w-1/2">
              <Image
                src="/assets/home/Countdown/foto_reloj_anillo.jpg"
                alt="Reloj y anillo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center md:w-1/2">
              <p className="mb-5 text-center font-cormorant text-xl leading-snug text-[#790c30] italic md:text-left md:text-2xl">
                ¡Preparen sus mejores pasos de baile para nuestro gran día!
              </p>
              <div className="mx-auto mb-5 h-px w-full bg-[#670626] md:mx-0" />
              <p className="text-center font-mono text-sm leading-relaxed font-light text-[#790c30] md:text-left">
                Con inmensa alegría, queremos invitarlos a celebrar el inicio de
                nuestro capítulo más bonito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
