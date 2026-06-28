export const dynamic = 'force-dynamic'

import { auth, signOut } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Button } from 'antd'
import { redirect } from 'next/navigation'
import { ConfirmedTableArrange } from './ConfirmedTableArrange'
import { CreateInvitationForm } from './CreateInvitationForm'
import { InvitationsTable } from './InvitationsTable'
import { RsvpsTable } from './RsvpsTable'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { code: newCode } = await searchParams

  const [rsvps, invitations, confirmedGuests] = await Promise.all([
    prisma.rsvp.findMany({
      orderBy: { submittedAt: 'desc' },
      include: { guests: true, invitation: true },
    }),
    prisma.invitation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { rsvps: true } } },
    }),
    prisma.guest.findMany({
      where: { confirmed: true, tableNumber: { not: null } },
      include: { rsvp: { select: { id: true, name: true, phone: true } } },
      orderBy: [{ tableNumber: 'asc' }, { name: 'asc' }],
    }),
  ])

  const attending = rsvps.filter((r) => r.attending)
  const notAttending = rsvps.filter((r) => !r.attending)
  const totalGuests = attending.reduce((acc, r) => acc + r.guests.length, 0)

  return (
    <div className="min-h-screen bg-papaya-whip-900">
      {/* Header */}
      <header className="flex items-center justify-between bg-deep-space-blue px-6 py-4">
        <div>
          <a
            href="/"
            className="font-cormorant text-xl tracking-wide text-papaya-whip"
          >
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <span className="ml-3 font-mono text-xs tracking-[0.3em] text-steel-blue-300 uppercase">
            Admin
          </span>
        </div>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}
        >
          <Button
            htmlType="submit"
            type="text"
            className="h-auto! p-0! font-mono text-xs tracking-widest text-white! uppercase transition-colors hover:text-brick-red!"
          >
            Salir
          </Button>
        </form>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* New code banner */}
        {newCode && (
          <div className="card mb-8 border-l-4 border-muted-olive bg-muted-olive-900">
            <p className="font-mono text-sm text-deep-space-blue">
              Código creado:{' '}
              <strong className="font-mono text-lg tracking-widest text-brick-red">
                {newCode}
              </strong>{' '}
              — compártelo con tus invitados.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Total RSVPs', value: rsvps.length },
            { label: 'Asistirán', value: attending.length },
            { label: 'No asistirán', value: notAttending.length },
            { label: 'Total invitados', value: totalGuests },
          ].map(({ label, value }) => (
            <div key={label} className="card py-6 text-center">
              <p className="font-cormorant text-4xl font-light text-brick-red">
                {value}
              </p>
              <p className="mt-1 font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Invitations */}
        <div className="card mb-8">
          <h2 className="mb-6 font-cormorant text-2xl font-light text-deep-space-blue">
            Pases de Invitación
          </h2>

          <CreateInvitationForm />

          <InvitationsTable invitations={invitations} />
        </div>

        {/* Full RSVP table */}
        <div className="card mb-8">
          <h2 className="mb-6 font-cormorant text-2xl font-light text-deep-space-blue">
            Todas las respuestas
          </h2>
          <RsvpsTable rsvps={rsvps} />
        </div>

        {/* Table arrangement */}
        <div className="card">
          <h2 className="mb-6 font-cormorant text-2xl font-light text-deep-space-blue">
            Distribución de mesas
          </h2>
          <ConfirmedTableArrange confirmedGuests={confirmedGuests} />
        </div>
      </main>
    </div>
  )
}
