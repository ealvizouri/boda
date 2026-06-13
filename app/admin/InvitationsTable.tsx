"use client";

import React, { useState, useTransition } from "react";
import { Popconfirm } from "antd";
import { updateInvitation, deleteInvitation } from "@/app/actions";
import { Ban, Pencil, Save, Trash } from "lucide-react";

type Invitation = {
  id: string;
  code: string;
  recipient: string;
  maxGuests: number;
  createdAt: Date;
  _count: { rsvps: number };
};

const SEAT_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

export function InvitationsTable({
  invitations,
}: {
  invitations: Invitation[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    code: "",
    recipient: "",
    maxGuests: 2,
  });
  const [rowError, setRowError] = useState<{ id: string; msg: string } | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function startEdit(inv: Invitation) {
    setEditingId(inv.id);
    setEditValues({ code: inv.code, recipient: inv.recipient, maxGuests: inv.maxGuests });
    setRowError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setRowError(null);
  }

  function saveEdit(id: string) {
    const code = editValues.code.trim().toUpperCase();
    if (!code) return;
    startTransition(async () => {
      try {
        await updateInvitation(id, { code, recipient: editValues.recipient.trim(), maxGuests: editValues.maxGuests });
        setEditingId(null);
        setRowError(null);
      } catch (e) {
        setRowError({ id, msg: (e as Error).message });
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteInvitation(id);
      } catch (e) {
        setRowError({ id, msg: (e as Error).message });
      }
    });
  }

  if (invitations.length === 0) {
    return (
      <p className="font-sans font-light text-deep-space-blue-400 text-center py-4">
        Aún no hay pases creados.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full font-sans text-sm">
        <thead>
          <tr className="border-b border-muted-olive-800">
            <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
              Código
            </th>
            <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
              Destinatario
            </th>
            <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
              Lugares
            </th>
            <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3 pr-4">
              RSVPs
            </th>
            <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-3">
              Creado
            </th>
            <th className="pb-3" />
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => {
            const isEditing = editingId === inv.id;
            const err = rowError?.id === inv.id ? rowError.msg : null;
            return (
              <React.Fragment key={inv.id}>
                <tr
                  key={inv.id}
                  className="border-b border-muted-olive-900 last:border-0"
                >
                  <td className="py-3 pr-4">
                    {isEditing ? (
                      <input
                        value={editValues.code}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            code: e.target.value.toUpperCase(),
                          }))
                        }
                        maxLength={8}
                        className="font-mono font-bold tracking-widest text-brick-red bg-transparent border-b border-brick-red outline-none w-24"
                      />
                    ) : (
                      <span className="font-mono font-bold tracking-widest text-brick-red">
                        {inv.code}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    {isEditing ? (
                      <input
                        value={editValues.recipient}
                        onChange={(e) =>
                          setEditValues((v) => ({ ...v, recipient: e.target.value }))
                        }
                        className="text-deep-space-blue bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 font-sans text-sm w-40"
                      />
                    ) : (
                      <span className="text-deep-space-blue">{inv.recipient}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    {isEditing ? (
                      <select
                        value={editValues.maxGuests}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            maxGuests: Number(e.target.value),
                          }))
                        }
                        className="bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 font-sans text-sm text-deep-space-blue"
                      >
                        {SEAT_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-deep-space-blue-400">
                        {inv.maxGuests}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-deep-space-blue-400">
                    {inv._count.rsvps}
                  </td>
                  <td className="py-3 text-deep-space-blue-400 whitespace-nowrap">
                    {new Date(inv.createdAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="py-3 pl-2 whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => saveEdit(inv.id)}
                          disabled={isPending}
                          className="font-sans text-xs text-muted-olive-300 hover:text-muted-olive transition-colors disabled:opacity-50"
                        >
                          <Save className="cursor-pointer" size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="font-sans text-xs text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
                        >
                          <Ban className="cursor-pointer" size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(inv)}
                          className="font-sans text-xs text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
                        >
                          <Pencil className="cursor-pointer" size={16} />
                        </button>
                        <Popconfirm
                          title="¿Eliminar este pase?"
                          description={
                            inv._count.rsvps > 0
                              ? `Tiene ${inv._count.rsvps} RSVP${inv._count.rsvps !== 1 ? "s" : ""} registrado${inv._count.rsvps !== 1 ? "s" : ""}.`
                              : undefined
                          }
                          onConfirm={() => handleDelete(inv.id)}
                          okText="Eliminar"
                          cancelText="Cancelar"
                          okButtonProps={{ danger: true }}
                          disabled={isPending}
                        >
                          <button
                            disabled={isPending}
                            className="font-sans text-xs text-brick-red-300 hover:text-brick-red transition-colors disabled:opacity-50"
                          >
                            <Trash className="cursor-pointer" size={16} />
                          </button>
                        </Popconfirm>
                      </div>
                    )}
                  </td>
                </tr>
                {err && (
                  <tr key={`${inv.id}-err`}>
                    <td
                      colSpan={6}
                      className="pb-2 pt-0 font-sans text-xs text-brick-red"
                    >
                      {err}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
