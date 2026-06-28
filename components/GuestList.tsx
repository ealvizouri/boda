import { prisma } from '@/lib/prisma'

export default async function GuestList() {
  const rsvps = await prisma.rsvp.findMany({
    orderBy: { submittedAt: 'desc' },
    include: { guests: true },
  })

  const attending = rsvps.filter((r) => r.attending)
  const totalGuests = attending.reduce((acc, r) => acc + r.guests.length, 0)

  return (
    <section id="guests" className="bg-papaya-whip-800 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="ornament mb-4">
            <span className="font-cormorant text-2xl text-muted-olive italic">
              celebrando juntos
            </span>
          </div>
          <h2 className="section-heading">Lista de Invitados</h2>
          <p className="mt-4 font-mono font-light text-deep-space-blue-400">
            <span className="font-medium text-brick-red">
              {attending.length}
            </span>{' '}
            confirmaciones &nbsp;·&nbsp;
            <span className="font-medium text-brick-red">
              {totalGuests}
            </span>{' '}
            invitados asistirán
          </p>
        </div>

        {rsvps.length === 0 ? (
          <div className="card py-12 text-center font-mono font-light text-deep-space-blue-400">
            Aún no hay respuestas. ¡Sé el primero!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-muted-olive-800">
                  <th className="pr-4 pb-3 text-left text-xs tracking-widest text-muted-olive-300 uppercase">
                    Nombre
                  </th>
                  <th className="pr-4 pb-3 text-left text-xs tracking-widest text-muted-olive-300 uppercase">
                    Asistencia
                  </th>
                  <th className="hidden pb-3 text-left text-xs tracking-widest text-muted-olive-300 uppercase sm:table-cell">
                    Invitados
                  </th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-muted-olive-900 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-deep-space-blue">
                      {r.name}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block px-2 py-0.5 font-mono text-xs tracking-wider uppercase ${
                          r.attending
                            ? 'bg-muted-olive-800 text-muted-olive-200'
                            : 'bg-brick-red-900 text-brick-red-600'
                        }`}
                      >
                        {r.attending ? 'Asistirá' : 'No podrá'}
                      </span>
                    </td>
                    <td className="hidden py-3 text-deep-space-blue-400 sm:table-cell">
                      {r.attending ? r.guests.length : '—'}
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
