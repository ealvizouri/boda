export const dynamic = "force-dynamic";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InvitationsTable } from "./InvitationsTable";
import { RsvpsTable } from "./RsvpsTable";
import { ConfirmedTableArrange } from "./ConfirmedTableArrange";
import { CreateInvitationForm } from "./CreateInvitationForm";
import { Button } from "antd";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { code: newCode } = await searchParams;

  const [rsvps, invitations, confirmedGuests] = await Promise.all([
    prisma.rsvp.findMany({
      orderBy: { submittedAt: "desc" },
      include: { guests: true, invitation: true },
    }),
    prisma.invitation.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { rsvps: true } } },
    }),
    prisma.guest.findMany({
      where: { confirmed: true, tableNumber: { not: null } },
      include: { rsvp: { select: { id: true, name: true, phone: true } } },
      orderBy: [{ tableNumber: "asc" }, { name: "asc" }],
    }),
  ]);

  const attending = rsvps.filter((r) => r.attending);
  const notAttending = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((acc, r) => acc + r.guests.length, 0);

  return (
    <div className="min-h-screen bg-papaya-whip-900">
      {/* Header */}
      <header className="bg-deep-space-blue px-6 py-4 flex items-center justify-between">
        <div>
          <a
            href="/"
            className="font-display text-xl text-papaya-whip tracking-wide"
          >
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <span className="ml-3 font-sans text-xs tracking-[0.3em] uppercase text-steel-blue-300">
            Admin
          </span>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <Button
            htmlType="submit"
            type="text"
            className="font-sans text-xs tracking-widest uppercase text-white! hover:text-brick-red! transition-colors p-0! h-auto!"
          >
            Salir
          </Button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* New code banner */}
        {newCode && (
          <div className="mb-8 card border-l-4 border-muted-olive bg-muted-olive-900">
            <p className="font-sans text-sm text-deep-space-blue">
              Código creado:{" "}
              <strong className="font-mono text-lg tracking-widest text-brick-red">
                {newCode}
              </strong>{" "}
              — compártelo con tus invitados.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total RSVPs", value: rsvps.length },
            { label: "Asistirán", value: attending.length },
            { label: "No asistirán", value: notAttending.length },
            { label: "Total invitados", value: totalGuests },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center py-6">
              <p className="font-display text-4xl font-light text-brick-red">
                {value}
              </p>
              <p className="mt-1 font-sans text-xs tracking-widest uppercase text-muted-olive-300">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Invitations */}
        <div className="card mb-8">
          <h2 className="font-display text-2xl font-light text-deep-space-blue mb-6">
            Pases de Invitación
          </h2>

          <CreateInvitationForm />

          <InvitationsTable invitations={invitations} />
        </div>

        {/* Full RSVP table */}
        <div className="card mb-8">
          <h2 className="font-display text-2xl font-light text-deep-space-blue mb-6">
            Todas las respuestas
          </h2>
          <RsvpsTable rsvps={rsvps} />
        </div>

        {/* Table arrangement */}
        <div className="card">
          <h2 className="font-display text-2xl font-light text-deep-space-blue mb-6">
            Distribución de mesas
          </h2>
          <ConfirmedTableArrange confirmedGuests={confirmedGuests} />
        </div>
      </main>
    </div>
  );
}
