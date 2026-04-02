const milestones = [
  {
    year: '2019',
    title: 'El Primer Encuentro',
    body: "Dos desconocidos se cruzaron en la reunión de un amigo en común. Ninguno sabía que ese encuentro fortuito cambiaría sus vidas para siempre.",
  },
  {
    year: '2020',
    title: 'La Primera Cita',
    body: 'Un paseo por el parque que duró toda la tarde. Las horas pasaron como minutos — y supieron que algo muy especial había comenzado.',
  },
  {
    year: '2022',
    title: 'Aventuras Juntos',
    body: 'Desde escapadas de fin de semana hasta viajes espontáneos al extranjero, cada aventura fue más memorable porque la vivieron uno al lado del otro.',
  },
  {
    year: '2025',
    title: 'La Propuesta',
    body: 'Bajo las estrellas, con el corazón lleno de amor y un anillo en mano, él hizo la pregunta que llevaba años escrita en su corazón. Ella dijo que sí.',
  },
  {
    year: '2026',
    title: 'Comienza el Para Siempre',
    body: 'El 12 de septiembre, rodeados de su familia y amigos más cercanos, Mariano y Jackie comienzan la más grande de todas las aventuras.',
  },
]

export default function OurStory() {
  return (
    <section id="story" className="py-24 px-6 bg-deep-space-blue">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-16 bg-muted-olive opacity-50" />
            <span className="font-display italic text-muted-olive text-2xl">una historia de amor</span>
            <span className="block h-px w-16 bg-muted-olive opacity-50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-widest uppercase text-papaya-whip">
            Nuestra Historia
          </h2>
        </div>

        <ol className="relative border-l border-muted-olive-200 ml-6">
          {milestones.map(({ year, title, body }, i) => (
            <li key={i} className="mb-12 ml-8 last:mb-0">
              {/* Dot */}
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-brick-red border-2 border-deep-space-blue" />

              <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-olive mb-1 block">
                {year}
              </span>
              <h3 className="font-display text-xl font-light text-papaya-whip mb-2">{title}</h3>
              <p className="font-sans font-light text-steel-blue-700 leading-relaxed text-sm">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
