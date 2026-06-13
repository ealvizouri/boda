"use client";

import { useState, useTransition } from "react";
import { Table, Input, Checkbox, Select } from "antd";
import type { TableColumnType } from "antd";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { updateRsvp, updateGuest } from "@/app/actions";
import { Ban, Pencil, Save, Search } from "lucide-react";

type Guest = {
  id: string;
  name: string;
  tableNumber: number | null;
  confirmed: boolean;
};

type Rsvp = {
  id: string;
  name: string;
  attending: boolean;
  phone: string | null;
  message: string | null;
  submittedAt: Date;
  guests: Guest[];
};

export function RsvpsTable({ rsvps }: { rsvps: Rsvp[] }) {
  const [globalSearch, setGlobalSearch] = useState("");

  const [editingRsvpId, setEditingRsvpId] = useState<string | null>(null);
  const [rsvpEditValues, setRsvpEditValues] = useState({ name: "", phone: "" });

  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [guestEditValues, setGuestEditValues] = useState<{
    name: string;
    tableNumber: number | null;
    confirmed: boolean;
  }>({ name: "", tableNumber: null, confirmed: false });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const nameFilter = useSearchFilter<Rsvp>("name");

  function startEditRsvp(r: Rsvp) {
    setEditingRsvpId(r.id);
    setRsvpEditValues({ name: r.name, phone: r.phone ?? "" });
    setErrors({});
  }

  function cancelEditRsvp() {
    setEditingRsvpId(null);
    setErrors({});
  }

  function saveRsvp(id: string) {
    const name = rsvpEditValues.name.trim();
    if (!name) return;
    startTransition(async () => {
      try {
        await updateRsvp(id, {
          name,
          phone: rsvpEditValues.phone.trim() || null,
        });
        setEditingRsvpId(null);
      } catch (e) {
        setErrors((prev) => ({ ...prev, [id]: (e as Error).message }));
      }
    });
  }

  function startEditGuest(g: Guest) {
    setEditingGuestId(g.id);
    setGuestEditValues({
      name: g.name,
      tableNumber: g.tableNumber,
      confirmed: g.confirmed,
    });
    setErrors({});
  }

  function cancelEditGuest() {
    setEditingGuestId(null);
    setErrors({});
  }

  function saveGuest(id: string) {
    const name = guestEditValues.name.trim();
    if (!name) return;
    startTransition(async () => {
      try {
        await updateGuest(id, {
          name,
          tableNumber: guestEditValues.tableNumber,
          confirmed: guestEditValues.confirmed,
        });
        setEditingGuestId(null);
      } catch (e) {
        setErrors((prev) => ({ ...prev, [id]: (e as Error).message }));
      }
    });
  }

  const columns: TableColumnType<Rsvp>[] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      ...nameFilter,
      render: (_, r) =>
        editingRsvpId === r.id ? (
          <input
            value={rsvpEditValues.name}
            onChange={(e) =>
              setRsvpEditValues((v) => ({ ...v, name: e.target.value }))
            }
            className="text-deep-space-blue font-medium bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 w-36"
          />
        ) : (
          <span className="text-deep-space-blue font-medium">{r.name}</span>
        ),
    },
    {
      title: "Asistencia",
      dataIndex: "attending",
      key: "attending",
      filters: [
        { text: "Asistirá", value: true },
        { text: "No podrá", value: false },
      ],
      onFilter: (value, record) => record.attending === value,
      render: (attending: boolean) => (
        <span
          className={`inline-block px-2 py-0.5 text-xs tracking-wider uppercase ${
            attending
              ? "bg-muted-olive-800 text-muted-olive-200"
              : "bg-brick-red-900 text-brick-red-600"
          }`}
        >
          {attending ? "Asistirá" : "No podrá"}
        </span>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      render: (_, r) =>
        editingRsvpId === r.id ? (
          <input
            value={rsvpEditValues.phone}
            onChange={(e) =>
              setRsvpEditValues((v) => ({ ...v, phone: e.target.value }))
            }
            className="text-deep-space-blue-400 bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 w-28"
          />
        ) : (
          <span className="text-deep-space-blue-400">{r.phone || "—"}</span>
        ),
    },
    {
      title: "Confirmados",
      key: "confirmed",
      filters: [
        { text: "Todos confirmados", value: "all" },
        { text: "Algunos confirmados", value: "some" },
        { text: "Ninguno confirmado", value: "none" },
      ],
      onFilter: (value, r) => {
        if (!r.attending || r.guests.length === 0) return value === "none";
        const count = r.guests.filter((g) => g.confirmed).length;
        if (value === "all") return count === r.guests.length;
        if (value === "some") return count > 0 && count < r.guests.length;
        return count === 0;
      },
      render: (_: unknown, r: Rsvp) => {
        if (!r.attending || r.guests.length === 0)
          return <span className="text-deep-space-blue-400">—</span>;
        const count = r.guests.filter((g) => g.confirmed).length;
        return (
          <span className="text-deep-space-blue-400">
            {count}/{r.guests.length}
          </span>
        );
      },
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
      render: (message: string | null) => (
        <span className="text-deep-space-blue-400 max-w-xs truncate block">
          {message || "—"}
        </span>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date: Date) => (
        <span className="text-deep-space-blue-400 whitespace-nowrap">
          {new Date(date).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      render: (_, r) =>
        editingRsvpId === r.id ? (
          <div className="flex gap-3">
            <button
              onClick={() => saveRsvp(r.id)}
              disabled={isPending}
              className="cursor-pointer text-muted-olive-300 hover:text-muted-olive transition-colors disabled:opacity-50"
            >
              <Save size={16} />
            </button>
            <button
              onClick={cancelEditRsvp}
              className="cursor-pointer text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
            >
              <Ban size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => startEditRsvp(r)}
            className="cursor-pointer text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
          >
            <Pencil size={16} />
          </button>
        ),
    },
  ];

  if (rsvps.length === 0) {
    return (
      <p className="font-sans font-light text-deep-space-blue-400 py-8 text-center">
        Aún no hay respuestas.
      </p>
    );
  }

  const needle = globalSearch.toLowerCase();
  const filtered = needle
    ? rsvps.filter(
        (r) =>
          r.name.toLowerCase().includes(needle) ||
          (r.phone ?? "").toLowerCase().includes(needle) ||
          (r.message ?? "").toLowerCase().includes(needle) ||
          r.guests.some((g) => g.name.toLowerCase().includes(needle)),
      )
    : rsvps;

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Buscar por nombre, teléfono, mensaje o invitado…"
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
        expandable={{
          rowExpandable: (r) => r.attending && r.guests.length > 0,
          expandedRowRender: (r) => (
            <div className="px-4 py-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-muted-olive-900">
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-2 pr-4 font-normal">
                      Nombre
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-2 pr-4 font-normal">
                      Mesa
                    </th>
                    <th className="text-left text-xs tracking-widest uppercase text-muted-olive-300 pb-2 pr-4 font-normal">
                      Confirmado
                    </th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {r.guests.map((g) => {
                    const isEditing = editingGuestId === g.id;
                    const err = errors[g.id];
                    return (
                      <>
                        <tr key={g.id}>
                          <td className="py-2 pr-4">
                            {isEditing ? (
                              <input
                                value={guestEditValues.name}
                                onChange={(e) =>
                                  setGuestEditValues((v) => ({
                                    ...v,
                                    name: e.target.value,
                                  }))
                                }
                                className="text-deep-space-blue bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-0.5 w-32"
                              />
                            ) : (
                              <span className="text-deep-space-blue">
                                {g.name}
                              </span>
                            )}
                          </td>
                          <td className="py-2 pr-4">
                            {isEditing ? (
                              <Select
                                value={guestEditValues.tableNumber}
                                onChange={(val) =>
                                  setGuestEditValues((v) => ({
                                    ...v,
                                    tableNumber: val,
                                  }))
                                }
                                allowClear
                                placeholder="—"
                                size="small"
                                className="w-20"
                                options={Array.from({ length: 15 }, (_, i) => ({
                                  label: `Mesa ${i + 1}`,
                                  value: i + 1,
                                }))}
                              />
                            ) : (
                              <span className="text-deep-space-blue-400">
                                {g.tableNumber ?? "—"}
                              </span>
                            )}
                          </td>
                          <td className="py-2 pr-4">
                            {isEditing ? (
                              <Checkbox
                                checked={guestEditValues.confirmed}
                                onChange={(e) =>
                                  setGuestEditValues((v) => ({
                                    ...v,
                                    confirmed: e.target.checked,
                                  }))
                                }
                              />
                            ) : (
                              <span className="text-deep-space-blue-400">
                                {g.confirmed ? "✓" : "—"}
                              </span>
                            )}
                          </td>
                          <td className="py-2">
                            {isEditing ? (
                              <div className="flex gap-3">
                                <button
                                  onClick={() => saveGuest(g.id)}
                                  disabled={isPending}
                                  className="cursor-pointer text-muted-olive-300 hover:text-muted-olive transition-colors disabled:opacity-50"
                                >
                                  <Save size={14} />
                                </button>
                                <button
                                  onClick={cancelEditGuest}
                                  className="cursor-pointer text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
                                >
                                  <Ban size={14} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEditGuest(g)}
                                className="cursor-pointer text-deep-space-blue-400 hover:text-deep-space-blue transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                        {err && (
                          <tr key={`${g.id}-err`}>
                            <td
                              colSpan={4}
                              className="pb-2 font-sans text-xs text-brick-red"
                            >
                              {err}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
              {errors[r.id] && (
                <p className="mt-1 font-sans text-xs text-brick-red">
                  {errors[r.id]}
                </p>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}
