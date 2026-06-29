'use client'

import { submitRsvp } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import type { InvitationData } from './types'

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

const inputClass =
  'w-full border-b border-white/30 bg-transparent py-2 font-mono text-sm text-white placeholder-white/30 transition-colors outline-none focus:border-white/70'

const labelClass = 'mb-1 block font-cormorant text-xl text-white'

export default function RsvpFormStep({
  invitation,
  attending,
  onSuccess,
}: {
  invitation: InvitationData
  attending: boolean
  onSuccess: () => void
}) {
  const router = useRouter()
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, control, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        name: invitation.existingRsvp?.name ?? invitation.recipient,
        phone: invitation.existingRsvp?.phone ?? '',
        message: invitation.existingRsvp?.message ?? '',
        guests: Array.from({ length: invitation.maxGuests }, (_, i) => ({
          name: invitation.existingRsvp?.guests[i]?.name ?? '',
        })),
      },
    })

  const { fields } = useFieldArray({ control, name: 'guests' })
  const nameValue = watch('name')

  useEffect(() => {
    if (attending && fields.length > 0) {
      setValue('guests.0.name', nameValue)
    }
  }, [nameValue, attending, fields.length, setValue])

  async function onSubmit(data: FormValues) {
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
      router.refresh()
      onSuccess()
    } catch (err: unknown) {
      setSubmitStatus('error')
      setErrorMsg(
        (err as Error)?.message ||
          'Ocurrió un error. Por favor intenta de nuevo.',
      )
    }
  }

  return (
    <>
      {/* Invitation header */}
      <div className="mb-8 text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/60 uppercase">
          {attending ? '✓ Invitación para' : 'Respuesta para'}
        </p>
        <p className="font-cormorant text-2xl font-bold text-white">
          {invitation.recipient}
        </p>
        <p className="font-cormorant text-lg text-white/75">
          {invitation.maxGuests} lugar{invitation.maxGuests !== 1 ? 'es' : ''}
        </p>
        {invitation.existingRsvp && (
          <p className="mt-1 font-mono text-xs text-white">
            Editando invitación
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Invitation code (read-only) */}
        <div>
          <label className={labelClass}>Código de invitación*</label>
          <p className="border-b border-white/20 py-2 font-mono text-sm tracking-[0.2em] text-white/50">
            {invitation.code}
          </p>
        </div>

        {/* Name */}
        <div>
          <label className={labelClass}>Nombre completo*</label>
          <input
            type="text"
            {...register('name', { required: true })}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Teléfono / WhatsApp*</label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="10 dígitos"
            className={inputClass}
          />
        </div>

        {/* Guest names */}
        {attending && (
          <div className="flex flex-col gap-4">
            <label className={labelClass}>Invitados que asistirán</label>
            {fields.map((field, idx) => (
              <div key={field.id}>
                <label className="mb-1 block font-mono text-xs text-white/50">
                  {idx === 0 ? 'Tú' : `Invitado ${idx + 1}`}
                </label>
                <input
                  type="text"
                  {...register(`guests.${idx}.name`)}
                  placeholder={
                    idx === 0
                      ? 'Nombre completo'
                      : 'Dejar en blanco si no asistirá'
                  }
                  readOnly={idx === 0}
                  className={`w-full border-b bg-transparent py-2 font-mono text-sm placeholder-white/30 transition-colors outline-none ${
                    idx === 0
                      ? 'cursor-default border-white/20 text-white/50'
                      : 'border-white/30 text-white focus:border-white/70'
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Message */}
        <div>
          <label className={labelClass}>
            Mensaje para los novios (opcional)
          </label>
          <textarea
            rows={3}
            {...register('message')}
            placeholder="Comparte tus mejores deseos..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {submitStatus === 'error' && (
          <p className="font-mono text-sm text-brick-red-400">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className="mt-2 w-full rounded-full bg-white py-4 font-mono text-sm tracking-[0.2em] text-deep-space-blue transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitStatus === 'submitting'
            ? 'Enviando…'
            : invitation.existingRsvp
              ? 'Actualizar confirmación'
              : 'Confirmar'}
        </button>
      </form>
    </>
  )
}
