import { PrismaClient } from '@prisma/client'
import { userSeed } from './seeds'

const prisma = new PrismaClient()

async function main() {
  await Promise.all([userSeed(prisma)])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
