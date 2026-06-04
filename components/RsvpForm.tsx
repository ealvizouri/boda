'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { lookupInvitation, submitRsvp } from '@/app/actions'

interface GuestField {
  name: string
}

interface FormValues {
  name: string
  phone: string
  message: string
  guests: GuestField[]
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

type ExistingRsvp = { name: string; phone: string | null; attending: boolean; message: string; guests: { name: string }[] }
type InvitationData = { id: string; recipient: string; maxGuests: number; existingRsvp: ExistingRsvp | null }

export default function RsvpForm() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)

  const [codeInput, setCodeInput] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [invitation, setInvitation] = useState<InvitationData | null>(null)

  const { register, handleSubmit, control, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: { name: '', phone: '', message: '', guests: [] },
  })
  const { fields, replace } = useFieldArray({ control, name: 'guests' })

  const nameValue = watch('name')
  useEffect(() => {
    if (attending === true && fields.length > 0) {
      setValue('guests.0.name', nameValue)
    }
  }, [nameValue, attending, fields.length, setValue])

  async function handleCodeLookup() {
    const code = codeInput.trim().toUpperCase()
    if (!code) return
    setCodeLoading(true)
    setCodeError('')
    try {
      const inv = await lookupInvitation(code)

      if (!inv) {
        setCodeError('Código no válido. Verifica tu invitación física.')
        setInvitation(null)
      } else {
        const existing = inv.rsvps[0] ?? null
        setInvitation({ id: inv.id, recipient: inv.recipient, maxGuests: inv.maxGuests, existingRsvp: existing })
        if (existing) {
          setValue('name', existing.name)
          setValue('phone', existing.phone ?? '')
          setValue('message', existing.message)
          setAttending(existing.attending)
          replace(Array.from({ length: inv.maxGuests }, (_, i) => ({ name: existing.guests[i]?.name ?? '' })))
        } else {
          setValue('name', inv.recipient)
          setValue('phone', '')
          setValue('message', '')
          setAttending(null)
          replace(Array.from({ length: inv.maxGuests }, () => ({ name: '' })))
        }
      }
    } finally {
      setCodeLoading(false)
    }
  }

  function handleAttending(value: boolean) {
    setAttending(value)
  }

  async function onSubmit(data: FormValues) {
    if (attending === null || !invitation) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      await submitRsvp({
        invitationId: invitation.id,
        name: data.name,
        phone: data.phone || undefined,
        attending,
        message: data.message,
        guests: attending ? data.guests.filter(g => g.name.trim()) : [],
      })
      setStatus('success')
      router.refresh()
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg((err as Error)?.message || 'Ocurrió un error. Por favor intenta de nuevo o contáctanos directamente.')
    }
  }

  function handleReset() {
    setStatus('idle')
    setAttending(null)
    setInvitation(null)
    setCodeInput('')
    setCodeError('')
    reset()
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
              onClick={handleReset}
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

        <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-6">
          {/* Invitation code */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
              Código de invitación *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleCodeLookup() } }}
                placeholder="5 letras — ej. RMKJX"
                maxLength={5}
                className="flex-1 bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 uppercase tracking-widest transition-colors"
              />
              <button
                type="button"
                onClick={handleCodeLookup}
                disabled={codeLoading || !codeInput.trim()}
                className="font-sans text-xs tracking-widest uppercase text-brick-red border border-brick-red px-3 py-1 hover:bg-brick-red hover:text-papaya-whip-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {codeLoading ? '…' : 'Verificar'}
              </button>
            </div>
            {codeError && (
              <p className="mt-1 font-sans text-xs text-brick-red-600">{codeError}</p>
            )}
            {invitation && (
              <p className="mt-1 font-sans text-xs text-muted-olive-300">
                ✓ Invitación para <strong className="text-deep-space-blue">{invitation.recipient}</strong>{' '}
                · {invitation.maxGuests} lugar{invitation.maxGuests !== 1 ? 'es' : ''}
                {invitation.existingRsvp && (
                  <span className="ml-2 text-brick-red">· Editando respuesta anterior</span>
                )}
              </p>
            )}
            {!invitation && (
              <p className="mt-1 font-sans text-xs text-deep-space-blue-400">
                Encuéntralo en tu invitación física. ¿No lo tienes? Contáctanos.
              </p>
            )}
          </div>

          {invitation && (
            <>
              {/* Name */}
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Tu nombre"
                  className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
                  Teléfono / WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="10 dígitos"
                  className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 transition-colors"
                />
              </div>

              {/* Attending */}
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
                      onClick={() => handleAttending(opt.value)}
                      className={`flex-1 py-3 border font-sans text-xs tracking-wider uppercase transition-all duration-200
                        ${attending === opt.value
                          ? 'bg-brick-red border-brick-red text-papaya-whip-900'
                          : 'border-muted-olive-700 text-deep-space-blue-400 hover:border-brick-red hover:text-brick-red'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-guest rows */}
              {attending === true && (
                <div className="flex flex-col gap-4">
                  <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300">
                    Invitados que asistirán
                  </label>
                  {fields.map((field, idx) => (
                    <div key={field.id} className="flex-1">
                      <label className="block font-sans text-xs text-muted-olive-400 mb-1">
                        {idx === 0 ? 'Tú' : `Invitado ${idx + 1}`}
                      </label>
                      <input
                        type="text"
                        {...register(`guests.${idx}.name`)}
                        placeholder={idx === 0 ? 'Nombre completo' : 'Dejar en blanco si no asiste'}
                        readOnly={idx === 0}
                        className={`w-full bg-transparent border-b outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 transition-colors ${
                          idx === 0
                            ? 'border-muted-olive-800 text-deep-space-blue-400 cursor-default'
                            : 'border-muted-olive-700 focus:border-brick-red'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300 mb-2">
                  Mensaje para los novios (opcional)
                </label>
                <textarea
                  rows={3}
                  {...register('message')}
                  placeholder="Comparte tus deseos..."
                  className="w-full bg-transparent border-b border-muted-olive-700 focus:border-brick-red outline-none py-2 font-sans text-deep-space-blue placeholder-deep-space-blue-400 resize-none transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="font-sans text-sm text-brick-red-600">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || attending === null}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Enviando…' : invitation?.existingRsvp ? 'Actualizar mi confirmación' : 'Enviar mi confirmación'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
