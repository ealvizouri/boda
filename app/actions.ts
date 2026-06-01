'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export interface RsvpPayload {
  name: string
  attending: boolean
  guestCount: number
  meal: string
  message: string
}

export async function submitRsvp(data: RsvpPayload) {
  await prisma.rsvp.create({
    data: {
      name: data.name.trim(),
      attending: data.attending,
      guestCount: data.attending ? data.guestCount : 0,
      meal: data.meal,
      message: data.message.trim(),
    },
  })
  revalidatePath('/')
}
