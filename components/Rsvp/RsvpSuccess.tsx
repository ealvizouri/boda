'use client'

import { SquareCheckBig } from 'lucide-react'

const EVENT_START = '20261017T170000'
const EVENT_END = '20261018T030000'
const EVENT_LOCATION =
  'Negrito Poeta 84, Tenencia Sta Maria de Guido, Morelia, Mich.'

function handleAddToCalendar() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${EVENT_START}`,
    `DTEND:${EVENT_END}`,
    'SUMMARY:Boda de Jackie & Mariano',
    `LOCATION:${EVENT_LOCATION}`,
    'DESCRIPTION:¡Nos vemos en nuestra boda!',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'boda-jackie-mariano.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function RsvpSuccess({ onReset }: { onReset: () => void }) {
  return (
    <>
      <div className="mb-5 flex justify-center text-white">
        <SquareCheckBig size={64} strokeWidth={1.5} />
      </div>

      <p className="mb-10 font-cormorant text-sm tracking-[0.4em] text-muted-olive-600 uppercase">
        Asistencia confirmada
      </p>

      <p className="mb-8 font-cormorant text-2xl tracking-wide text-white">
        ¡Nos vemos pronto!
      </p>

      <p className="mb-10 font-quattro text-sm leading-relaxed text-white/85">
        Gracias por ser parte de este capítulo. Contar contigo ese día hace que
        todo se sienta aún más especial.
      </p>

      <p className="mb-2 font-cormorant text-xs tracking-[0.3em] text-white/80 uppercase">
        Te esperamos el
      </p>
      <p className="mb-10 font-cormorant text-2xl font-bold tracking-wide text-white">
        17&bull;Octubre&bull;2026
      </p>

      <button
        onClick={handleAddToCalendar}
        className="mb-10 rounded-full bg-white px-8 py-4 font-mono text-sm tracking-widest text-[#4b4e40] transition-colors hover:bg-white/90"
      >
        Agregar al calendario
      </button>

      <p className="mb-10 font-antarisk text-4xl text-[#faf1e1] md:text-5xl">
        Jackie &amp; Mariano
      </p>

      <button
        onClick={onReset}
        className="font-mono text-xs tracking-widest text-white/60 uppercase underline underline-offset-4 transition-colors hover:text-white/90"
      >
        Enviar otra respuesta
      </button>
    </>
  )
}
