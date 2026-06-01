import { prisma } from '@/lib/prisma'

export default async function GuestList() {
  const rsvps = await prisma.rsvp.findMany({
    orderBy: { submittedAt: 'desc' },
  })

  const attending = rsvps.filter(r => r.attending)
  const totalGuests = attending.reduce((acc, r) => acc + (r.guestCount || 1), 0)

  return (
    <section id="guests" className="py-24 px-6 bg-papaya-whip-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="ornament mb-4">
            <span className="font-display italic text-muted-olive text-2xl">celebrando juntos</span>
          </div>
          <h2 className="section-heading">Lista de Invitados</h2>
          <p className="mt-4 font-sans font-light text-deep-space-blue-400">
            <span className="font-medium text-brick-red">{attending.length}</span> confirmaciones
            &nbsp;·&nbsp;
            <span className="font-medium text-brick-red">{totalGuests}</span> invitados asistirán
          </p>
        </div>

        {rsvps.length === 0 ? (
          <div className="card text-center text-deep-space-blue-400 font-sans font-light py-12">
            Aún no hay respuestas. ¡Sé el primero!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-muted-olive-800">
                  <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Nombre</th>
                  <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Asistencia</th>
                  <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4 hidden sm:table-cell">Invitados</th>
                  <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 hidden md:table-cell">Menú</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map(r => (
                  <tr key={r.id} className="border-b border-muted-olive-900 last:border-0">
                    <td className="py-3 pr-4 text-deep-space-blue font-medium">{r.name}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs tracking-wider uppercase font-sans
                          ${r.attending
                            ? 'bg-muted-olive-800 text-muted-olive-200'
                            : 'bg-brick-red-900 text-brick-red-600'
                          }`}
                      >
                        {r.attending ? 'Asistirá' : 'No podrá'}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-deep-space-blue-400 hidden sm:table-cell">
                      {r.attending ? r.guestCount : '—'}
                    </td>
                    <td className="py-3 text-deep-space-blue-400 hidden md:table-cell">
                      {r.attending ? r.meal : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
