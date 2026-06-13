"use client";

import { useState } from "react";
import { Table, Input } from "antd";
import type { TableColumnType } from "antd";
import { Search } from "lucide-react";

type GuestWithRsvp = {
  id: string;
  name: string;
  tableNumber: number | null;
  rsvp: {
    id: string;
    name: string;
    phone: string | null;
  };
};

type TableGroup = {
  tableNumber: number;
  guests: GuestWithRsvp[];
  rsvps: Array<{
    id: string;
    name: string;
    phone: string | null;
    guests: GuestWithRsvp[];
  }>;
};

function groupByTable(guests: GuestWithRsvp[]): TableGroup[] {
  const map = new Map<number, GuestWithRsvp[]>();
  for (const g of guests) {
    if (g.tableNumber === null) continue;
    const list = map.get(g.tableNumber) ?? [];
    list.push(g);
    map.set(g.tableNumber, list);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([tableNumber, gs]) => {
      const rsvpMap = new Map<
        string,
        { id: string; name: string; phone: string | null; guests: GuestWithRsvp[] }
      >();
      for (const g of gs) {
        const entry = rsvpMap.get(g.rsvp.id) ?? {
          ...g.rsvp,
          guests: [],
        };
        entry.guests.push(g);
        rsvpMap.set(g.rsvp.id, entry);
      }
      return {
        tableNumber,
        guests: gs,
        rsvps: Array.from(rsvpMap.values()),
      };
    });
}

export function ConfirmedTableArrange({
  confirmedGuests,
}: {
  confirmedGuests: GuestWithRsvp[];
}) {
  const [globalSearch, setGlobalSearch] = useState("");

  const groups = groupByTable(confirmedGuests);

  const needle = globalSearch.toLowerCase();
  const filtered = needle
    ? groups.filter(
        (t) =>
          String(t.tableNumber).includes(needle) ||
          t.guests.some((g) => g.name.toLowerCase().includes(needle)) ||
          t.rsvps.some((r) => r.name.toLowerCase().includes(needle)),
      )
    : groups;

  const columns: TableColumnType<TableGroup>[] = [
    {
      title: "Mesa",
      dataIndex: "tableNumber",
      key: "tableNumber",
      render: (n: number) => (
        <span className="font-mono font-bold text-brick-red">#{n}</span>
      ),
    },
    {
      title: "Invitados confirmados",
      key: "count",
      render: (_: unknown, t: TableGroup) => (
        <span className="text-deep-space-blue-400">{t.guests.length}</span>
      ),
    },
    {
      title: "RSVPs",
      key: "rsvps",
      render: (_: unknown, t: TableGroup) => (
        <span className="text-deep-space-blue-400">{t.rsvps.length}</span>
      ),
    },
  ];

  if (confirmedGuests.length === 0) {
    return (
      <p className="font-sans font-light text-deep-space-blue-400 py-8 text-center">
        Aún no hay invitados confirmados con mesa asignada.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Buscar por mesa, invitado o RSVP…"
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        allowClear
        prefix={<Search size={14} className="text-muted-olive-400" />}
        className="max-w-sm"
      />
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="tableNumber"
        pagination={false}
        scroll={{ y: 600 }}
        size="small"
        expandable={{
          expandedRowRender: (t) => (
            <div className="px-4 py-3 flex flex-col gap-4">
              {t.rsvps.map((rsvp) => (
                <div key={rsvp.id}>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-1">
                    {rsvp.name}
                    {rsvp.phone && (
                      <span className="ml-2 normal-case text-deep-space-blue-400">
                        · {rsvp.phone}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {rsvp.guests.map((g) => (
                      <span
                        key={g.id}
                        className="font-sans text-xs text-deep-space-blue bg-papaya-whip-800 px-2 py-1"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        }}
      />
    </div>
  );
}
