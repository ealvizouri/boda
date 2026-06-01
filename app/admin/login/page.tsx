'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const result = await signIn('credentials', {
      username,
      password,
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
    <div className="min-h-screen bg-papaya-whip-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="font-display text-2xl text-deep-space-blue tracking-wide">
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <p className="mt-2 font-sans text-xs tracking-[0.3em] uppercase text-muted-olive-300">
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-5">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue transition-colors"
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-brick-red-600">
              Credenciales incorrectas.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
