import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Production uses the Neon serverless driver (HTTP/WebSocket) to avoid TCP
// connection exhaustion in Vercel's serverless functions. Development keeps
// the standard pg driver against a local PostgreSQL instance.
function makeClient() {
  const url = process.env.DATABASE_URL!
  const adapter =
    process.env.NODE_ENV === 'production'
      ? new PrismaNeon({ connectionString: url })
      : new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter, log: ['info'] })
}

// Singleton in non-production environments: Next.js hot-reload re-evaluates
// modules on each change, which would otherwise create a new PrismaClient
// (and a new connection pool) on every save. Attaching to `global` survives
// module re-evaluation. In production each serverless invocation is isolated,
// so the singleton is unnecessary and omitted.
export const prisma = globalForPrisma.prisma || makeClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
