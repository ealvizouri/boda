'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitRsvp } from '@/app/actions'

const MEAL_OPTIONS = ['Sin preferencia', 'Pollo', 'Pescado', 'Vegetariano', 'Vegano']

interface FormState {
  name: string
  attending: boolean | null
  guestCount: number
  meal: string
  message: string
}

const initialState: FormState = {
  name: '',
  attending: null,
  guestCount: 1,
  meal: 'Sin preferencia',
  message: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')
  const router = useRouter()

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || form.attending === null) return
    setStatus('submitting')
    try {
      await submitRsvp({
        name: form.name,
        attending: form.attending,
        guestCount: form.guestCount,
        meal: form.meal,
        message: form.message,
      })
      setStatus('success')
      setForm(initialState)
      router.refresh()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="py-24 px-6 bg-papaya-whip-900">
        <div className="max-w-lg mx-auto text-center">
          <div className="card">
            <div className="text-5xl mb-6">💌</div>
            <h3 className="font-display text-3xl font-light text-deep-space-blue mb-3">¡Gracias!</h3>
            <p className="font-sans font-light text-deep-space-blue-400 mb-6">
              Tu respuesta ha sido registrada. Esperamos celebrar este día especial contigo.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="font-sans text-xs tracking-widest uppercase text-brick-red underline underline-offset-4 hover:text-molten-lava transition-colors"
            >
              Enviar otra respuesta
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-papaya-whip-900">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="ornament mb-4">
            <span className="font-display italic text-muted-olive text-2xl">confirma antes del 1° de agosto</span>
          </div>
          <h2 className="section-heading">RSVP</h2>
          <p className="mt-4 font-sans font-light text-deep-space-blue-400 max-w-sm mx-auto">
            Por favor haznos saber si podrás acompañarnos. Sería un honor tenerte presente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-6">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Tu nombre"
              className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-3">
              ¿Asistirás? *
            </label>
            <div className="flex gap-4">
              {[
                { label: 'Con gusto asisto', value: true },
                { label: 'Con pena no podré', value: false },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => update('attending', opt.value)}
                  className={`flex-1 py-3 border font-sans text-xs tracking-wider uppercase transition-all duration-200
                    ${form.attending === opt.value
                      ? 'bg-brick-red border-brick-red text-papaya-whip-900'
                      : 'border-muted-olive-700 text-deep-space-blue-400 hover:border-brick-red hover:text-brick-red'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {form.attending === true && (
            <>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
                  Número de invitados (incluyéndote)
                </label>
                <select
                  value={form.guestCount}
                  onChange={e => update('guestCount', Number(e.target.value))}
                  className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue transition-colors"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
                  Preferencia de menú
                </label>
                <select
                  value={form.meal}
                  onChange={e => update('meal', e.target.value)}
                  className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue transition-colors"
                >
                  {MEAL_OPTIONS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
              Mensaje para los novios (opcional)
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={e => update('message', e.target.value)}
              placeholder="Comparte tus deseos..."
              className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 resize-none transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="font-sans text-sm text-brick-red-600">
              Ocurrió un error. Por favor intenta de nuevo o contáctanos directamente.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting' || form.attending === null}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Enviando…' : 'Enviar mi confirmación'}
          </button>
        </form>
      </div>
    </section>
  )
}
