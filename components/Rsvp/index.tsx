'use client'

import cn from '@/lib/cn'
import Image from 'next/image'
import { useState } from 'react'
import type { InvitationData, Step } from './types'
import RsvpCode from './RsvpCode'
import RsvpFormStep from './RsvpFormStep'
import RsvpGate from './RsvpGate'
import RsvpSuccess from './RsvpSuccess'
import RsvpTitle from './RsvpTitle'

const BG_GREEN = '/assets/home/shared/background_green.png'

export default function Rsvp() {
  const [step, setStep] = useState<Step>('gate')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [invitation, setInvitation] = useState<InvitationData | null>(null)

  function handleGateSelect(value: boolean) {
    setAttending(value)
    setStep('code')
  }

  function handleCodeSuccess(inv: InvitationData) {
    setInvitation(inv)
    setStep('form')
  }

  function handleReset() {
    setStep('gate')
    setAttending(null)
    setInvitation(null)
  }

  const isForm = step === 'form'
  const darkOverlay = step === 'success' || isForm

  return (
    <section
      id="rsvp"
      className={cn(
        'relative flex min-h-screen justify-center py-20',
        isForm ? 'items-start px-4' : 'flex-col items-center px-6',
      )}
    >
      <Image src={BG_GREEN} alt="" fill className="object-cover" />
      <div className={cn('absolute inset-0', darkOverlay ? 'bg-black/35' : 'bg-black/25')} />

      <div
        className={cn(
          'relative z-10 mx-auto w-full',
          isForm ? 'max-w-sm md:max-w-lg' : 'max-w-sm',
          (step === 'gate' || step === 'success') && 'text-center',
        )}
      >
        <RsvpTitle />

        {step === 'gate' && <RsvpGate onSelect={handleGateSelect} />}
        {step === 'code' && <RsvpCode onSuccess={handleCodeSuccess} />}
        {step === 'form' && (
          <RsvpFormStep
            invitation={invitation!}
            attending={attending!}
            onSuccess={() => setStep('success')}
          />
        )}
        {step === 'success' && <RsvpSuccess onReset={handleReset} />}
      </div>
    </section>
  )
}
