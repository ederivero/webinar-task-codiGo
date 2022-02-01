import { compareSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { plainToClass } from 'class-transformer'
import { Unauthorized, BadRequest } from 'http-errors'
import ms from 'ms'
import { prisma } from '../prisma'
import { LoginDto } from '../dtos/user/request/login.dto'
import { UserWithAccessTokenDto } from '../dtos/user/response/user-token.dto'
import { JWTPayloadType } from '../types'

export class UserService {
  static async login(data: LoginDto) {
    const expirationTime = new Date()
    const refreshExpirationTime = new Date()
    const expiresAt = ms(process.env.JWT_EXP ?? '')
    const refreshExpiresAt = ms(process.env.JWT_EXP_REFRESH ?? '')

    expirationTime.setMilliseconds(expirationTime.getMilliseconds() + expiresAt)
    refreshExpirationTime.setMilliseconds(
      refreshExpirationTime.getMilliseconds() + refreshExpiresAt,
    )

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!compareSync(data.password, user.password)) {
      throw new Unauthorized('The credentials are incorrect')
    }

    const auth = await prisma.auth.create({
      data: {
        userId: user.id,
      },
    })

    return plainToClass(
      UserWithAccessTokenDto,
      {
        accessToken: this.generateJWT({ jti: auth.jti, aud: auth.aud }),
        refreshToken: this.generateJWT({
          jti: auth.refreshToken,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_EXP_REFRESH,
        }),
        user,
        expiresAt: expirationTime,
        refreshExpiresAt: refreshExpirationTime,
      },
      { enableImplicitConversion: true },
    )
  }

  static generateJWT(args: JWTPayloadType): string {
    return sign(
      {
        jti: args.jti,
        aud: args.aud,
      },
      args.secret ?? process.env.JWT_SECRET ?? '',
      {
        expiresIn: args.expiresIn ?? process.env.JWT_EXP,
      },
    )
  }

  static async logout(token: string) {
    const payload = verify(token, String(process.env.JWT_SECRET))
    try {
      if (typeof payload !== 'string') {
        await prisma.auth.delete({ where: { jti: payload.jti } })
        return
      }
    } catch (error) {
      throw new BadRequest('The token was already deleted')
    }
  }
}
