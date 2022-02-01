import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'

export const prisma = new PrismaClient({
  rejectOnNotFound: (error: any) => new createHttpError.NotFound(error.message),
})
