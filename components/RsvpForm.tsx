'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { lookupInvitation, submitRsvp } from '@/app/actions'
import Image from 'next/image'

interface GuestField { name: string }
interface FormValues { name: string; phone: string; message: string; guests: GuestField[] }

type SubmitStatus = 'idle' | 'submitting' | 'error'
type Step = 'gate' | 'code' | 'form' | 'success'
type ExistingRsvp = { name: string; phone: string | null; attending: boolean; message: string; guests: { name: string }[] }
type InvitationData = { id: string; recipient: string; maxGuests: number; existingRsvp: ExistingRsvp | null }

const BG_GREEN = '/assets/home/shared/background_green.png'

export default function RsvpForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('gate')
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
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
        setCodeError('Código no válido. Verifica tu invitación.')
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
          replace(Array.from({ length: inv.maxGuests }, () => ({ name: '' })))
        }
        setStep('form')
      }
    } finally {
      setCodeLoading(false)
    }
  }

  async function onSubmit(data: FormValues) {
    if (attending === null || !invitation) return
    setSubmitStatus('submitting')
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
      setStep('success')
      router.refresh()
    } catch (err: unknown) {
      setSubmitStatus('error')
      setErrorMsg((err as Error)?.message || 'Ocurrió un error. Por favor intenta de nuevo.')
    }
  }

  function handleReset() {
    setStep('gate')
    setSubmitStatus('idle')
    setAttending(null)
    setInvitation(null)
    setCodeInput('')
    setCodeError('')
    reset()
  }

  // ─── Gate ───────────────────────────────────────────────────────────────────
  if (step === 'gate') {
    return (
      <section id="rsvp" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center max-w-sm mx-auto w-full">
          <h2 className="font-engravers tracking-[0.5em] text-white text-3xl mb-10">RSVP</h2>

          <p className="font-sans font-light text-white/75 text-sm mb-1">
            Favor de confirmar antes del
          </p>
          <p className="font-display text-white text-2xl font-semibold mb-10">
            1 de Agosto
          </p>

          <p className="font-display italic text-white text-2xl mb-8">¿Nos acompañas?</p>

          <div className="flex flex-col gap-4 mb-10">
            <button
              onClick={() => { setAttending(true); setStep('code') }}
              className="w-full bg-white text-deep-space-blue font-sans text-sm tracking-[0.15em] py-4 rounded-full hover:bg-white/90 transition-colors"
            >
              ¡Ahí estaré!
            </button>
            <button
              onClick={() => { setAttending(false); setStep('code') }}
              className="w-full border border-white/70 text-white font-sans text-sm tracking-[0.15em] py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              No podré asistir
            </button>
          </div>

          <p className="font-sans font-light text-white/55 text-xs leading-relaxed mb-3">
            Nos encantan los pequeños pero en esta ocasión hemos decidido que la celebración sea{' '}
            <strong className="text-white/75 font-semibold">solo para adultos</strong>
          </p>
          <p className="font-sans font-light text-white/45 text-xs leading-relaxed">
            Agradecemos tu comprensión y esperamos que este día sea una oportunidad para que disfrutes y te relajes al máximo con nosotros
          </p>
        </div>
      </section>
    )
  }

  // ─── Code entry ─────────────────────────────────────────────────────────────
  if (step === 'code') {
    return (
      <section id="rsvp" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 w-full max-w-sm mx-auto">
          <h2 className="font-engravers tracking-[0.5em] text-white text-3xl mb-14 text-center">RSVP</h2>

          <p className="font-display text-white text-2xl mb-1">Ingresa tu código</p>
          <p className="font-engravers text-white/45 tracking-[0.4em] text-[10px] uppercase mb-0.5">
            5 Letras
          </p>
          <input
            type="text"
            value={codeInput}
            onChange={e => setCodeInput(e.target.value.toUpperCase())}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleCodeLookup() } }}
            placeholder="Tu código viene adjunto en el mensaje"
            maxLength={5}
            className="w-full bg-transparent border-b border-white/35 focus:border-white/80 outline-none py-2 font-mono text-white placeholder-white/30 text-sm tracking-[0.3em] mb-10 transition-colors uppercase"
          />

          {codeError && (
            <p className="text-brick-red-700 text-xs mb-5 font-sans">{codeError}</p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleCodeLookup}
              disabled={codeLoading || codeInput.trim().length === 0}
              className="bg-white text-deep-space-blue font-sans text-sm tracking-[0.2em] px-14 py-4 rounded-full hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {codeLoading ? '…' : 'Verificar'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ─── Success ─────────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <section id="rsvp" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 text-center max-w-sm mx-auto">
          <h2 className="font-engravers tracking-[0.5em] text-white text-3xl mb-8">RSVP</h2>
          <p className="font-display italic text-white text-3xl mb-4">¡Gracias!</p>
          <p className="font-sans font-light text-white/70 text-sm leading-relaxed mb-8">
            Tu respuesta ha sido registrada. Esperamos celebrar este día especial contigo.
          </p>
          <button
            onClick={handleReset}
            className="font-sans text-xs tracking-widest uppercase text-white/60 underline underline-offset-4 hover:text-white/90 transition-colors"
          >
            Enviar otra respuesta
          </button>
        </div>
      </section>
    )
  }

  // ─── Form (after code verified) ──────────────────────────────────────────────
  return (
    <section id="rsvp" className="relative min-h-screen flex items-start justify-center px-4 py-20">
      <Image src={BG_GREEN} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 w-full max-w-sm md:max-w-lg mx-auto">
        <h2 className="font-engravers tracking-[0.5em] text-white text-3xl mb-8 text-center">RSVP</h2>

        {invitation && (
          <p className="font-sans text-xs text-white/60 text-center mb-6">
            Invitación para <strong className="text-white/80">{invitation.recipient}</strong>
            {' · '}{invitation.maxGuests} lugar{invitation.maxGuests !== 1 ? 'es' : ''}
            {invitation.existingRsvp && (
              <span className="text-brick-red-700 ml-1">· Editando respuesta anterior</span>
            )}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#fdf8f2] px-7 py-8 shadow-2xl flex flex-col gap-6">

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
            <div className="flex gap-3">
              {[
                { label: 'Con gusto asisto', value: true },
                { label: 'Con pena no podré', value: false },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => setAttending(opt.value)}
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

          {/* Guest names */}
          {attending === true && (
            <div className="flex flex-col gap-4">
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-olive-300">
                Invitados que asistirán
              </label>
              {fields.map((field, idx) => (
                <div key={field.id}>
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

          {submitStatus === 'error' && (
            <p className="font-sans text-sm text-brick-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitStatus === 'submitting' || attending === null}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === 'submitting'
              ? 'Enviando…'
              : invitation?.existingRsvp
              ? 'Actualizar mi confirmación'
              : 'Enviar mi confirmación'}
          </button>
        </form>
      </div>
    </section>
  )
}
