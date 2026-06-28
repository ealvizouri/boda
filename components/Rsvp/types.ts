export type Step = 'gate' | 'code' | 'form' | 'success'

export type ExistingRsvp = {
  name: string
  phone: string | null
  attending: boolean
  message: string
  guests: { name: string }[]
}

export type InvitationData = {
  id: string
  code: string
  recipient: string
  maxGuests: number
  existingRsvp: ExistingRsvp | null
}
