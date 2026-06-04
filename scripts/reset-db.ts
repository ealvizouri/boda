import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Usage: npx tsx scripts/reset-db.ts <path-to-csv>')
  console.error('CSV format: code,maxGuests,recipient')
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL env var is required')
  process.exit(1)
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

function parseCsv(filePath: string) {
  const text = fs.readFileSync(path.resolve(filePath), 'utf-8')
  const lines = text.trim().split('\n').slice(1) // skip header row
  return lines
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(',')
      const code = parts[0].trim().toUpperCase()
      const maxGuests = parseInt(parts[1].trim(), 10)
      const recipient = parts.slice(2).join(',').trim()
      if (!code || isNaN(maxGuests) || !recipient) {
        throw new Error(`Invalid row: "${line}"`)
      }
      return { code, maxGuests, recipient }
    })
}

async function main() {
  const invitations = parseCsv(csvPath)
  console.log(`Parsed ${invitations.length} invitations from CSV.`)

  await prisma.$transaction(async tx => {
    const { count: guests } = await tx.guest.deleteMany()
    const { count: rsvps } = await tx.rsvp.deleteMany()
    const { count: invs } = await tx.invitation.deleteMany()
    console.log(`Deleted ${guests} guests, ${rsvps} RSVPs, ${invs} invitations.`)

    await tx.invitation.createMany({ data: invitations })
    console.log(`Created ${invitations.length} invitations.`)
  })

  console.log('Done.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
