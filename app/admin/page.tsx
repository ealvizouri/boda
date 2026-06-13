export const dynamic = "force-dynamic";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createInvitation } from "@/app/actions";
import { InvitationsTable } from "./InvitationsTable";
import React from "react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { code: newCode } = await searchParams;

  const [rsvps, invitations] = await Promise.all([
    prisma.rsvp.findMany({
      orderBy: { submittedAt: "desc" },
      include: { guests: true, invitation: true },
    }),
    prisma.invitation.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { rsvps: true } } },
    }),
  ]);

  const attending = rsvps.filter((r) => r.attending);
  const notAttending = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((acc, r) => acc + r.guests.length, 0);

  async function handleCreateInvitation(formData: FormData) {
    "use server";
    const recipient = (formData.get("recipient") as string)?.trim();
    const maxGuests = Number(formData.get("maxGuests"));
    if (!recipient || !maxGuests) return;
    const inv = await createInvitation(recipient, maxGuests);
    redirect(`/admin?code=${inv.code}`);
  }

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
          <button
            type="submit"
            className="font-sans text-xs tracking-widest uppercase text-steel-blue-300 hover:text-brick-red transition-colors"
          >
            Salir
          </button>
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

          {/* Create form */}
          <form
            action={handleCreateInvitation}
            className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-muted-olive-800"
          >
            <div className="flex-1 min-w-40">
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-1">
                Destinatario
              </label>
              <input
                name="recipient"
                type="text"
                required
                placeholder="Familia García"
                className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-1.5 font-sans text-sm text-deep-space-blue placeholder-deep-space-blue-400 transition-colors"
              />
            </div>
            <div className="w-28">
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-1">
                Lugares
              </label>
              <select
                name="maxGuests"
                defaultValue={2}
                className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-1.5 font-sans text-sm text-deep-space-blue transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="self-end">
              <button type="submit" className="btn-primary py-1.5 px-4 text-xs">
                Crear pase
              </button>
            </div>
          </form>

          <InvitationsTable invitations={invitations} />
        </div>

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
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
                      Nombre
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
                      Asistencia
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
                      Teléfono
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
                      Invitados
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
                      Mensaje
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <React.Fragment key={r.id}>
                      <tr className="border-b border-muted-olive-900">
                        <td className="py-3 pr-4 text-deep-space-blue font-medium">
                          {r.name}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs tracking-wider uppercase
                            ${
                              r.attending
                                ? "bg-muted-olive-800 text-muted-olive-200"
                                : "bg-brick-red-900 text-brick-red-600"
                            }`}
                          >
                            {r.attending ? "Asistirá" : "No podrá"}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-deep-space-blue-400">
                          {r.phone || "—"}
                        </td>
                        <td className="py-3 pr-4 text-deep-space-blue-400">
                          {r.attending ? r.guests.length : "—"}
                        </td>
                        <td className="py-3 pr-4 text-deep-space-blue-400 max-w-xs truncate">
                          {r.message || "—"}
                        </td>
                        <td className="py-3 text-deep-space-blue-400 whitespace-nowrap">
                          {new Date(r.submittedAt).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                      {r.attending && r.guests.length > 0 && (
                        <tr
                          key={`${r.id}-guests`}
                          className="border-b border-muted-olive-900 last:border-0 bg-papaya-whip-800"
                        >
                          <td colSpan={6} className="py-2 px-4">
                            <div className="flex flex-wrap gap-3">
                              {r.guests.map((g) => (
                                <span
                                  key={g.id}
                                  className="font-sans text-xs text-deep-space-blue"
                                >
                                  {g.name}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
