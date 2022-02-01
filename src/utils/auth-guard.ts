import { Request, Response, NextFunction } from 'express'
import { Unauthorized } from 'http-errors'
import { verify } from 'jsonwebtoken'
import { prisma } from '../prisma'

export async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    throw new Unauthorized('This request needs credentials ')
  }

  const token = req.headers.authorization.split(' ')[1]

  const payload = verify(token, String(process.env.JWT_SECRET))
  if (typeof payload !== 'string') {
    const auth = await prisma.auth.findFirst({
      where: { jti: payload.jti },
      include: { user: { select: { id: true, email: true } } },
    })
    if (auth.user) {
      req.user = auth.user
    }
    next()
  }
}
