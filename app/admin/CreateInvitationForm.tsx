"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button } from "antd";
import { createInvitation } from "@/app/actions";

const SEAT_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

export function CreateInvitationForm() {
  const [form] = Form.useForm<{ recipient: string; maxGuests: number }>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleFinish(values: { recipient: string; maxGuests: number }) {
    startTransition(async () => {
      const inv = await createInvitation(values.recipient.trim(), values.maxGuests);
      form.resetFields();
      router.push(`/admin?code=${inv.code}`);
    });
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{ maxGuests: 2 }}
      layout="vertical"
      className="flex flex-wrap items-end gap-3 mb-6 pb-6 border-b border-muted-olive-800"
    >
      <Form.Item
        name="recipient"
        label={
          <span className="font-sans text-xs tracking-widest uppercase text-muted-olive-300">
            Destinatario
          </span>
        }
        rules={[{ required: true, message: "" }]}
        colon={false}
        className="flex-1 min-w-40 mb-0"
      >
        <Input
          placeholder="Familia García"
          variant="underlined"
          className="font-sans text-sm text-deep-space-blue"
        />
      </Form.Item>

      <Form.Item
        name="maxGuests"
        label={
          <span className="font-sans text-xs tracking-widest uppercase text-muted-olive-300">
            Lugares
          </span>
        }
        rules={[{ required: true }]}
        colon={false}
        className="w-28 mb-0"
      >
        <Select
          options={SEAT_OPTIONS.map((n) => ({ label: n, value: n }))}
          className="w-full font-sans text-sm"
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button
          htmlType="submit"
          loading={isPending}
          className="btn-primary py-1.5! px-4! text-xs! h-auto!"
        >
          Crear pase
        </Button>
      </Form.Item>
    </Form>
  );
}
