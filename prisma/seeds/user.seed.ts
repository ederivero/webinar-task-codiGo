import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

export default async (prisma: PrismaClient) => {
  const password = hashSync('Welcome123!', 10)
  const result = []
  result.push(
    await prisma.user.upsert({
      create: {
        email: 'ederiveroman@gmail.com',
        fullName: 'eduardo de rivero',
        password,
      },
      update: {
        password,
      },
      where: { email: 'ederiveroman@gmail.com' },
    }),
  )
  return result
}
