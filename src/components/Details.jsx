const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
)

function EventCard({ tag, title, time, venue, address, extra, icon: Icon }) {
  return (
    <div className="card flex flex-col gap-6">
      <div className="flex flex-col items-center text-center gap-2">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-olive-300">{tag}</span>
        <h3 className="font-display text-3xl font-light text-deep-space-blue">{title}</h3>
        <span className="block h-px w-12 bg-brick-red-800 mt-1" />
      </div>

      <dl className="flex flex-col gap-4 text-sm font-sans">
        <div className="flex items-start gap-3">
          <ClockIcon />
          <div>
            <dt className="text-xs tracking-widest uppercase text-muted-olive-300 mb-0.5">Hora</dt>
            <dd className="text-deep-space-blue">{time}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPinIcon />
          <div>
            <dt className="text-xs tracking-widest uppercase text-muted-olive-300 mb-0.5">Lugar</dt>
            <dd className="text-deep-space-blue font-medium">{venue}</dd>
            <dd className="text-deep-space-blue-400">{address}</dd>
          </div>
        </div>
        {extra && (
          <div className="flex items-start gap-3">
            <SparkleIcon />
            <div>
              <dt className="text-xs tracking-widest uppercase text-muted-olive-300 mb-0.5">Código de Vestimenta</dt>
              <dd className="text-deep-space-blue">{extra}</dd>
            </div>
          </div>
        )}
      </dl>
    </div>
  )
}

export default function Details() {
  return (
    <section id="details" className="py-24 px-6 bg-papaya-whip-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">
            <span className="font-display italic text-muted-olive text-2xl">cuándo y dónde</span>
          </div>
          <h2 className="section-heading">Nuestro Gran Día</h2>
          <p className="mt-4 font-sans font-light text-deep-space-blue-400 tracking-wide max-w-md mx-auto">
            Sábado, 12 de septiembre de 2026 — no podemos esperar para celebrar con ustedes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <EventCard
            tag="01 — Ceremonia"
            title="La Ceremonia"
            time="4:00 PM"
            venue="La Gran Capilla"
            address="Calle Flores 123, Ciudad"
            extra="Etiqueta rigurosa opcional"
          />
          <EventCard
            tag="02 — Recepción"
            title="La Recepción"
            time="6:30 PM"
            venue="Salón Rosewood Estate"
            address="Av. Jardín 456, Ciudad"
            extra="Vestimenta formal bienvenida"
          />
        </div>

        <div className="mt-12 card text-center">
          <p className="font-display italic text-steel-blue text-xl mb-2">
            "Un amor así merece ser celebrado."
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-muted-olive-300">
            Cena, baile &amp; alegría sin fin
          </p>
        </div>
      </div>
    </section>
  )
}
