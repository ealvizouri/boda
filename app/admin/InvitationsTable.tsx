'use client'

import { deleteInvitation, updateInvitation } from '@/app/actions'
import { useClipboard } from '@/hooks/useClipboard'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import type { TableColumnType } from 'antd'
import { Button, Input, Popconfirm, Select, Table } from 'antd'
import { Ban, Copy, Pencil, Save, Search, Trash } from 'lucide-react'
import { useState, useTransition } from 'react'

type Invitation = {
  id: string
  code: string
  recipient: string
  maxGuests: number
  createdAt: Date
  _count: { rsvps: number }
}

const SEAT_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10]

export function InvitationsTable({
  invitations,
}: {
  invitations: Invitation[]
}) {
  const [globalSearch, setGlobalSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({
    code: '',
    recipient: '',
    maxGuests: 2,
  })
  const [rowError, setRowError] = useState<{ id: string; msg: string } | null>(
    null,
  )
  const [isPending, startTransition] = useTransition()

  const copyToClipboard = useClipboard()
  const codeFilter = useSearchFilter<Invitation>('code')
  const recipientFilter = useSearchFilter<Invitation>('recipient')

  function startEdit(inv: Invitation) {
    setEditingId(inv.id)
    setEditValues({
      code: inv.code,
      recipient: inv.recipient,
      maxGuests: inv.maxGuests,
    })
    setRowError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setRowError(null)
  }

  function saveEdit(id: string) {
    const code = editValues.code.trim().toUpperCase()
    if (!code) return
    startTransition(async () => {
      try {
        await updateInvitation(id, {
          code,
          recipient: editValues.recipient.trim(),
          maxGuests: editValues.maxGuests,
        })
        setEditingId(null)
        setRowError(null)
      } catch (e) {
        setRowError({ id, msg: (e as Error).message })
      }
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteInvitation(id)
      } catch (e) {
        setRowError({ id, msg: (e as Error).message })
      }
    })
  }

  const maxGuestsOptions = Array.from(
    new Set(invitations.map((i) => i.maxGuests)),
  )
    .sort((a, b) => a - b)
    .map((n) => ({ text: String(n), value: n }))

  const columns: TableColumnType<Invitation>[] = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      ...codeFilter,
      render: (_, inv) =>
        editingId === inv.id ? (
          <Input
            value={editValues.code}
            onChange={(e) =>
              setEditValues((v) => ({
                ...v,
                code: e.target.value.toUpperCase(),
              }))
            }
            maxLength={8}
            size="small"
            variant="underlined"
            className="w-24 font-mono font-bold tracking-widest text-brick-red"
          />
        ) : (
          <Button
            type="text"
            onClick={() =>
              copyToClipboard(
                inv.code,
                <span>
                  Copiaste el código{' '}
                  <span className="font-bold">{inv.code}</span>
                </span>,
              )
            }
            className="group flex h-auto items-center gap-1.5 p-0 font-mono font-bold tracking-widest text-brick-red transition-opacity hover:opacity-70"
          >
            {inv.code}
            <Copy
              size={12}
              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Button>
        ),
    },
    {
      title: 'Destinatario',
      dataIndex: 'recipient',
      key: 'recipient',
      ...recipientFilter,
      render: (_, inv) =>
        editingId === inv.id ? (
          <Input
            value={editValues.recipient}
            onChange={(e) =>
              setEditValues((v) => ({ ...v, recipient: e.target.value }))
            }
            size="small"
            variant="underlined"
            className="w-40 font-mono text-sm text-deep-space-blue"
          />
        ) : (
          <span className="text-deep-space-blue">{inv.recipient}</span>
        ),
    },
    {
      title: 'Lugares',
      dataIndex: 'maxGuests',
      key: 'maxGuests',
      filters: maxGuestsOptions,
      onFilter: (value, record) => record.maxGuests === value,
      render: (_, inv) =>
        editingId === inv.id ? (
          <Select
            value={editValues.maxGuests}
            onChange={(val) => setEditValues((v) => ({ ...v, maxGuests: val }))}
            size="small"
            options={SEAT_OPTIONS.map((n) => ({ label: n, value: n }))}
            className="w-20 font-mono text-sm"
          />
        ) : (
          <span className="text-deep-space-blue-400">{inv.maxGuests}</span>
        ),
    },
    {
      title: 'RSVPs',
      dataIndex: '_count',
      key: 'rsvps',
      render: (count: Invitation['_count']) => (
        <span className="text-deep-space-blue-400">{count.rsvps}</span>
      ),
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => (
        <span className="whitespace-nowrap text-deep-space-blue-400">
          {new Date(date).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      render: (_, inv) => {
        const err = rowError?.id === inv.id ? rowError.msg : null
        return (
          <div>
            {editingId === inv.id ? (
              <div className="flex gap-1">
                <Button
                  type="text"
                  icon={<Save size={16} />}
                  onClick={() => saveEdit(inv.id)}
                  disabled={isPending}
                  className="text-muted-olive-300 hover:text-muted-olive! disabled:opacity-50"
                />
                <Button
                  type="text"
                  icon={<Ban size={16} />}
                  onClick={cancelEdit}
                  className="text-deep-space-blue-400 hover:text-deep-space-blue!"
                />
              </div>
            ) : (
              <div className="flex gap-1">
                <Button
                  type="text"
                  icon={<Pencil size={16} />}
                  onClick={() => startEdit(inv)}
                  className="text-deep-space-blue-400 hover:text-deep-space-blue!"
                />
                <Popconfirm
                  title="¿Eliminar este pase?"
                  description={
                    inv._count.rsvps > 0
                      ? `Tiene ${inv._count.rsvps} RSVP${inv._count.rsvps !== 1 ? 's' : ''} registrado${inv._count.rsvps !== 1 ? 's' : ''}.`
                      : undefined
                  }
                  onConfirm={() => handleDelete(inv.id)}
                  okText="Eliminar"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true }}
                  disabled={isPending}
                >
                  <Button
                    type="text"
                    icon={<Trash size={16} />}
                    disabled={isPending}
                    className="text-brick-red-300 hover:text-brick-red! disabled:opacity-50"
                  />
                </Popconfirm>
              </div>
            )}
            {err && (
              <p className="mt-1 font-mono text-xs text-brick-red">{err}</p>
            )}
          </div>
        )
      },
    },
  ]

  if (invitations.length === 0) {
    return (
      <p className="py-4 text-center font-mono font-light text-deep-space-blue-400">
        Aún no hay pases creados.
      </p>
    )
  }

  const needle = globalSearch.toLowerCase()
  const filtered = needle
    ? invitations.filter(
        (inv) =>
          inv.code.toLowerCase().includes(needle) ||
          inv.recipient.toLowerCase().includes(needle) ||
          String(inv.maxGuests).includes(needle),
      )
    : invitations

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
  )
}
