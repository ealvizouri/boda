export const dynamic = 'force-dynamic'

import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const rsvps = await prisma.rsvp.findMany({
    orderBy: { submittedAt: 'desc' },
  })

  const attending = rsvps.filter(r => r.attending)
  const notAttending = rsvps.filter(r => !r.attending)
  const totalGuests = attending.reduce((acc, r) => acc + (r.guestCount || 1), 0)

  const mealCounts = attending.reduce<Record<string, number>>((acc, r) => {
    acc[r.meal] = (acc[r.meal] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-papaya-whip-900">
      {/* Header */}
      <header className="bg-deep-space-blue px-6 py-4 flex items-center justify-between">
        <div>
          <a href="/" className="font-display text-xl text-papaya-whip tracking-wide">
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <span className="ml-3 font-sans text-xs tracking-[0.3em] uppercase text-steel-blue-300">
            Admin
          </span>
        </div>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}
        >
          <button
            type="submit"
            className="font-sans text-xs tracking-widest uppercase text-steel-blue-300 hover:text-brick-red transition-colors"
          >
            Salir
          </button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total RSVPs', value: rsvps.length },
            { label: 'Asistirán', value: attending.length },
            { label: 'No asistirán', value: notAttending.length },
            { label: 'Total invitados', value: totalGuests },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center py-6">
              <p className="font-display text-4xl font-light text-brick-red">{value}</p>
              <p className="mt-1 font-sans text-xs tracking-widest uppercase text-muted-olive-300">{label}</p>
            </div>
          ))}
        </div>

        {/* Meal breakdown */}
        {Object.keys(mealCounts).length > 0 && (
          <div className="card mb-8">
            <h2 className="font-display text-2xl font-light text-deep-space-blue mb-4">
              Preferencias de menú
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(mealCounts).map(([meal, count]) => (
                <span key={meal} className="font-sans text-xs tracking-wider px-3 py-1.5 bg-muted-olive-800 text-muted-olive-200">
                  {meal} — <strong>{count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full RSVP table */}
        <div className="card">
          <h2 className="font-display text-2xl font-light text-deep-space-blue mb-6">
            Todas las respuestas
          </h2>
          {rsvps.length === 0 ? (
            <p className="font-sans font-light text-deep-space-blue-400 py-8 text-center">
              Aún no hay respuestas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr className="border-b border-muted-olive-800">
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Nombre</th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Asistencia</th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Invitados</th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Menú</th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">Mensaje</th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map(r => (
                    <tr key={r.id} className="border-b border-muted-olive-900 last:border-0">
                      <td className="py-3 pr-4 text-deep-space-blue font-medium">{r.name}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs tracking-wider uppercase
                            ${r.attending
                              ? 'bg-muted-olive-800 text-muted-olive-200'
                              : 'bg-brick-red-900 text-brick-red-600'
                            }`}
                        >
                          {r.attending ? 'Asistirá' : 'No podrá'}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-deep-space-blue-400">
                        {r.attending ? r.guestCount : '—'}
                      </td>
                      <td className="py-3 pr-4 text-deep-space-blue-400">
                        {r.attending ? r.meal : '—'}
                      </td>
                      <td className="py-3 pr-4 text-deep-space-blue-400 max-w-xs truncate">
                        {r.message || '—'}
                      </td>
                      <td className="py-3 text-deep-space-blue-400 whitespace-nowrap">
                        {new Date(r.submittedAt).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
