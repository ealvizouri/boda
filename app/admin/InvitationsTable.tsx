"use client";

import { useState, useTransition } from "react";
import { Table, Input, Popconfirm } from "antd";
import type { TableColumnType } from "antd";
import { updateInvitation, deleteInvitation } from "@/app/actions";
import { useClipboard } from "@/hooks/useClipboard";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { Ban, Check, Copy, Pencil, Save, Search, Trash } from "lucide-react";

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
  const [globalSearch, setGlobalSearch] = useState("");
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

  const copyToClipboard = useClipboard();
  const codeFilter = useSearchFilter<Invitation>("code");
  const recipientFilter = useSearchFilter<Invitation>("recipient");

  function startEdit(inv: Invitation) {
    setEditingId(inv.id);
    setEditValues({
      code: inv.code,
      recipient: inv.recipient,
      maxGuests: inv.maxGuests,
    });
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
        await updateInvitation(id, {
          code,
          recipient: editValues.recipient.trim(),
          maxGuests: editValues.maxGuests,
        });
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

  const maxGuestsOptions = Array.from(
    new Set(invitations.map((i) => i.maxGuests)),
  )
    .sort((a, b) => a - b)
    .map((n) => ({ text: String(n), value: n }));

  const columns: TableColumnType<Invitation>[] = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
      ...codeFilter,
      render: (_, inv) =>
        editingId === inv.id ? (
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
          <button
            onClick={() => copyToClipboard(inv.code, <span>
              Copiaste el código <span className="font-bold">{inv.code}</span>
            </span>)}
            className="flex items-center gap-1.5 group font-mono font-bold tracking-widest text-brick-red hover:opacity-70 transition-opacity cursor-pointer"
          >
            {inv.code}
            <Copy size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ),
    },
    {
      title: "Destinatario",
      dataIndex: "recipient",
      key: "recipient",
      ...recipientFilter,
      render: (_, inv) =>
        editingId === inv.id ? (
          <input
            value={editValues.recipient}
            onChange={(e) =>
              setEditValues((v) => ({ ...v, recipient: e.target.value }))
            }
            className="text-deep-space-blue bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 font-sans text-sm w-40"
          />
        ) : (
          <span className="text-deep-space-blue">{inv.recipient}</span>
        ),
    },
    {
      title: "Lugares",
      dataIndex: "maxGuests",
      key: "maxGuests",
      filters: maxGuestsOptions,
      onFilter: (value, record) => record.maxGuests === value,
      render: (_, inv) =>
        editingId === inv.id ? (
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
          <span className="text-deep-space-blue-400">{inv.maxGuests}</span>
        ),
    },
    {
      title: "RSVPs",
      dataIndex: "_count",
      key: "rsvps",
      render: (count: Invitation["_count"]) => (
        <span className="text-deep-space-blue-400">{count.rsvps}</span>
      ),
    },
    {
      title: "Creado",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: Date) => (
        <span className="text-deep-space-blue-400 whitespace-nowrap">
          {new Date(date).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      render: (_, inv) => {
        const err = rowError?.id === inv.id ? rowError.msg : null;
        return (
          <div>
            {editingId === inv.id ? (
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
            {err && (
              <p className="mt-1 font-sans text-xs text-brick-red">{err}</p>
            )}
          </div>
        );
      },
    },
  ];

  if (invitations.length === 0) {
    return (
      <p className="font-sans font-light text-deep-space-blue-400 text-center py-4">
        Aún no hay pases creados.
      </p>
    );
  }

  const needle = globalSearch.toLowerCase();
  const filtered = needle
    ? invitations.filter(
        (inv) =>
          inv.code.toLowerCase().includes(needle) ||
          inv.recipient.toLowerCase().includes(needle) ||
          String(inv.maxGuests).includes(needle),
      )
    : invitations;

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Buscar por código, destinatario o lugares…"
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        allowClear
        prefix={<Search size={14} className="text-muted-olive-400" />}
        className="max-w-sm"
      />
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ y: 600 }}
        size="small"
      />
    </div>
  );
}
