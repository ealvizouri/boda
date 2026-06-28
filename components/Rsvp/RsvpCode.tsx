'use client'

import { lookupInvitation } from '@/app/actions'
import { useState } from 'react'
import type { InvitationData } from './types'

export default function RsvpCode({
  onSuccess,
}: {
  onSuccess: (inv: InvitationData) => void
}) {
  const [codeInput, setCodeInput] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState('')

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
        onSuccess({
          id: inv.id,
          code,
          recipient: inv.recipient,
          maxGuests: inv.maxGuests,
          existingRsvp: inv.rsvps[0] ?? null,
        })
      }
    } finally {
      setCodeLoading(false)
    }
  }

  return (
    <>
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
        <p className="mb-5 font-mono text-xs text-brick-red-700">{codeError}</p>
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
    </>
  )
}
