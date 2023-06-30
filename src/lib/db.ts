//  initializes a Prisma client instance and ensures that the same instance is used across requests in a development environment by storing it in the global scope
//  In production, a new instance is created for each request.
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma