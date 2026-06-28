'use client'

import { lookupInvitation, submitRsvp } from '@/app/actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

interface GuestField {
  name: string
}
interface FormValues {
  name: string
  phone: string
  message: string
  guests: GuestField[]
}

type SubmitStatus = 'idle' | 'submitting' | 'error'
type Step = 'gate' | 'code' | 'form' | 'success'
type ExistingRsvp = {
  name: string
  phone: string | null
  attending: boolean
  message: string
  guests: { name: string }[]
}
type InvitationData = {
  id: string
  recipient: string
  maxGuests: number
  existingRsvp: ExistingRsvp | null
}

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

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<FormValues>({
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
        setInvitation({
          id: inv.id,
          recipient: inv.recipient,
          maxGuests: inv.maxGuests,
          existingRsvp: existing,
        })
        if (existing) {
          setValue('name', existing.name)
          setValue('phone', existing.phone ?? '')
          setValue('message', existing.message)
          setAttending(existing.attending)
          replace(
            Array.from({ length: inv.maxGuests }, (_, i) => ({
              name: existing.guests[i]?.name ?? '',
            })),
          )
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
        guests: attending ? data.guests.filter((g) => g.name.trim()) : [],
      })
      setStep('success')
      router.refresh()
    } catch (err: unknown) {
      setSubmitStatus('error')
      setErrorMsg(
        (err as Error)?.message ||
          'Ocurrió un error. Por favor intenta de nuevo.',
      )
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
      <section
        id="rsvp"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
      >
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-sm text-center">
          <h2 className="mb-10 font-engravers text-3xl tracking-[0.5em] text-white">
            RSVP
          </h2>

          <p className="mb-1 font-mono text-sm font-light text-white/75">
            Favor de confirmar antes del
          </p>
          <p className="mb-10 font-cormorant text-2xl font-semibold text-white">
            1 de Agosto
          </p>

          <p className="mb-8 font-cormorant text-2xl text-white italic">
            ¿Nos acompañas?
          </p>

          <div className="mb-10 flex flex-col gap-4">
            <button
              onClick={() => {
                setAttending(true)
                setStep('code')
              }}
              className="w-full rounded-full bg-white py-4 font-mono text-sm tracking-[0.15em] text-deep-space-blue transition-colors hover:bg-white/90"
            >
              ¡Ahí estaré!
            </button>
            <button
              onClick={() => {
                setAttending(false)
                setStep('code')
              }}
              className="w-full rounded-full border border-white/70 py-4 font-mono text-sm tracking-[0.15em] text-white transition-colors hover:bg-white/10"
            >
              No podré asistir
            </button>
          </div>

          <p className="mb-3 font-mono text-xs leading-relaxed font-light text-white/55">
            Nos encantan los pequeños pero en esta ocasión hemos decidido que la
            celebración sea{' '}
            <strong className="font-semibold text-white/75">
              solo para adultos
            </strong>
          </p>
          <p className="font-mono text-xs leading-relaxed font-light text-white/45">
            Agradecemos tu comprensión y esperamos que este día sea una
            oportunidad para que disfrutes y te relajes al máximo con nosotros
          </p>
        </div>
      </section>
    )
  }

  // ─── Code entry ─────────────────────────────────────────────────────────────
  if (step === 'code') {
    return (
      <section
        id="rsvp"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
      >
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-sm">
          <h2 className="mb-14 text-center font-engravers text-3xl tracking-[0.5em] text-white">
            RSVP
          </h2>

          <p className="mb-1 font-cormorant text-2xl text-white">
            Ingresa tu código
          </p>
          <p className="mb-0.5 font-engravers text-[10px] tracking-[0.4em] text-white/45 uppercase">
            5 Letras
          </p>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleCodeLookup()
              }
            }}
            placeholder="Tu código viene adjunto en el mensaje"
            maxLength={5}
            className="mb-10 w-full border-b border-white/35 bg-transparent py-2 font-mono text-sm tracking-[0.3em] text-white uppercase placeholder-white/30 transition-colors outline-none focus:border-white/80"
          />

          {codeError && (
            <p className="mb-5 font-mono text-xs text-brick-red-700">
              {codeError}
            </p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleCodeLookup}
              disabled={codeLoading || codeInput.trim().length === 0}
              className="rounded-full bg-white px-14 py-4 font-mono text-sm tracking-[0.2em] text-deep-space-blue transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
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
      <section
        id="rsvp"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
      >
        <Image src={BG_GREEN} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto max-w-sm text-center">
          <h2 className="mb-8 font-engravers text-3xl tracking-[0.5em] text-white">
            RSVP
          </h2>
          <p className="mb-4 font-cormorant text-3xl text-white italic">
            ¡Gracias!
          </p>
          <p className="mb-8 font-mono text-sm leading-relaxed font-light text-white/70">
            Tu respuesta ha sido registrada. Esperamos celebrar este día
            especial contigo.
          </p>
          <button
            onClick={handleReset}
            className="font-mono text-xs tracking-widest text-white/60 uppercase underline underline-offset-4 transition-colors hover:text-white/90"
          >
            Enviar otra respuesta
          </button>
        </div>
      </section>
    )
  }

  // ─── Form (after code verified) ──────────────────────────────────────────────
  return (
    <section
      id="rsvp"
      className="relative flex min-h-screen items-start justify-center px-4 py-20"
    >
      <Image src={BG_GREEN} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto w-full max-w-sm md:max-w-lg">
        <h2 className="mb-8 text-center font-engravers text-3xl tracking-[0.5em] text-white">
          RSVP
        </h2>

        {invitation && (
          <p className="mb-6 text-center font-mono text-xs text-white/60">
            Invitación para{' '}
            <strong className="text-white/80">{invitation.recipient}</strong>
            {' · '}
            {invitation.maxGuests} lugar{invitation.maxGuests !== 1 ? 'es' : ''}
            {invitation.existingRsvp && (
              <span className="ml-1 text-brick-red-700">
                · Editando respuesta anterior
              </span>
            )}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-[#fdf8f2] px-7 py-8 shadow-2xl"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
              Nombre completo *
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="Tu nombre"
              className="w-full border-b border-muted-olive-700 bg-transparent py-2 font-mono text-deep-space-blue placeholder-deep-space-blue-400 transition-colors outline-none focus:border-brick-red"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
              Teléfono / WhatsApp (opcional)
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="10 dígitos"
              className="w-full border-b border-muted-olive-700 bg-transparent py-2 font-mono text-deep-space-blue placeholder-deep-space-blue-400 transition-colors outline-none focus:border-brick-red"
            />
          </div>

          {/* Attending */}
          <div>
            <label className="mb-3 block font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
              ¿Asistirás? *
            </label>
            <div className="flex gap-3">
              {[
                { label: 'Con gusto asisto', value: true },
                { label: 'Con pena no podré', value: false },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => setAttending(opt.value)}
                  className={`flex-1 border py-3 font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                    attending === opt.value
                      ? 'border-brick-red bg-brick-red text-papaya-whip-900'
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
              <label className="block font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
                Invitados que asistirán
              </label>
              {fields.map((field, idx) => (
                <div key={field.id}>
                  <label className="mb-1 block font-mono text-xs text-muted-olive-400">
                    {idx === 0 ? 'Tú' : `Invitado ${idx + 1}`}
                  </label>
                  <input
                    type="text"
                    {...register(`guests.${idx}.name`)}
                    placeholder={
                      idx === 0
                        ? 'Nombre completo'
                        : 'Dejar en blanco si no asiste'
                    }
                    readOnly={idx === 0}
                    className={`w-full border-b bg-transparent py-2 font-mono text-deep-space-blue placeholder-deep-space-blue-400 transition-colors outline-none ${
                      idx === 0
                        ? 'cursor-default border-muted-olive-800 text-deep-space-blue-400'
                        : 'border-muted-olive-700 focus:border-brick-red'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Message */}
          <div>
            <label className="mb-2 block font-mono text-xs tracking-widest text-muted-olive-300 uppercase">
              Mensaje para los novios (opcional)
            </label>
            <textarea
              rows={3}
              {...register('message')}
              placeholder="Comparte tus deseos..."
              className="w-full resize-none border-b border-muted-olive-700 bg-transparent py-2 font-mono text-deep-space-blue placeholder-deep-space-blue-400 transition-colors outline-none focus:border-brick-red"
            />
          </div>

          {submitStatus === 'error' && (
            <p className="font-mono text-sm text-brick-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitStatus === 'submitting' || attending === null}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
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
