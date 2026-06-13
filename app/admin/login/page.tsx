"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  async function handleFinish(values: { username: string; password: string }) {
    setLoading(true);
    setError(false);
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-papaya-whip-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a
            href="/"
            className="font-display text-2xl text-deep-space-blue tracking-wide"
          >
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <p className="mt-2 font-sans text-xs tracking-[0.3em] uppercase text-muted-olive-300">
            Panel de administración
          </p>
        </div>

        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{ username: "admin", password: "p4ssword" }}
          layout="vertical"
          className="card flex flex-col gap-5"
        >
          <Form.Item
            name="username"
            label={
              <span className="font-sans text-xs tracking-widest uppercase text-muted-olive-300">
                Usuario
              </span>
            }
            rules={[{ required: true }]}
            colon={false}
            className="mb-0"
          >
            <Input
              variant="underlined"
              className="font-sans text-deep-space-blue"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span className="font-sans text-xs tracking-widest uppercase text-muted-olive-300">
                Contraseña
              </span>
            }
            rules={[{ required: true }]}
            colon={false}
            className="mb-0"
          >
            <Input.Password
              variant="underlined"
              className="font-sans text-deep-space-blue"
            />
          </Form.Item>

          {error && (
            <p className="font-sans text-sm text-brick-red-600">
              Credenciales incorrectas.
            </p>
          )}

          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              loading={loading}
              block
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
