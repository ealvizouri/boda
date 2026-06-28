'use client'

import { Button, Form, Input } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm()

  async function handleFinish(values: { username: string; password: string }) {
    setLoading(true)
    setError(false)
    const result = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    })
    setLoading(false)
    if (result?.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-papaya-whip-900 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="font-cormorant text-2xl tracking-wide text-deep-space-blue"
          >
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <p className="mt-2 font-mono text-xs tracking-[0.3em] text-muted-olive-300 uppercase">
            Panel de administración
          </p>
        </div>

        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{ username: 'admin', password: 'p4ssword' }}
          layout="vertical"
          className="card flex flex-col gap-5"
        >
          <Form.Item
            name="username"
            label={
              <span className="font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
                Usuario
              </span>
            }
            rules={[{ required: true }]}
            colon={false}
            className="mb-0"
          >
            <Input
              variant="underlined"
              className="font-mono text-deep-space-blue"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span className="font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
                Contraseña
              </span>
            }
            rules={[{ required: true }]}
            colon={false}
            className="mb-0"
          >
            <Input.Password
              variant="underlined"
              className="font-mono text-deep-space-blue"
            />
          </Form.Item>

          {error && (
            <p className="font-mono text-sm text-brick-red-600">
              Credenciales incorrectas.
            </p>
          )}

          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              loading={loading}
              block
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
