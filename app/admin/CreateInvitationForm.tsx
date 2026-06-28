'use client'

import { createInvitation } from '@/app/actions'
import { Button, Form, Input, Select } from 'antd'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const SEAT_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10]

export function CreateInvitationForm() {
  const [form] = Form.useForm<{ recipient: string; maxGuests: number }>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleFinish(values: { recipient: string; maxGuests: number }) {
    startTransition(async () => {
      const inv = await createInvitation(
        values.recipient.trim(),
        values.maxGuests,
      )
      form.resetFields()
      router.push(`/admin?code=${inv.code}`)
    })
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{ maxGuests: 2 }}
      layout="vertical"
      className="mb-6 flex flex-wrap items-end gap-3 border-b border-muted-olive-800 pb-6"
    >
      <Form.Item
        name="recipient"
        label={
          <span className="font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
            Destinatario
          </span>
        }
        rules={[{ required: true, message: '' }]}
        colon={false}
        className="mb-0 min-w-40 flex-1"
      >
        <Input
          placeholder="Familia García"
          variant="underlined"
          className="font-mono text-sm text-deep-space-blue"
        />
      </Form.Item>

      <Form.Item
        name="maxGuests"
        label={
          <span className="font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
            Lugares
          </span>
        }
        rules={[{ required: true }]}
        colon={false}
        className="mb-0 w-28"
      >
        <Select
          options={SEAT_OPTIONS.map((n) => ({ label: n, value: n }))}
          className="w-full font-mono text-sm"
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button
          htmlType="submit"
          loading={isPending}
          className="btn-primary h-auto! px-4! py-1.5! text-xs!"
        >
          Crear pase
        </Button>
      </Form.Item>
    </Form>
  )
}
