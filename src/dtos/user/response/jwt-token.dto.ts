import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class JwtTokenDto {
  @Expose()
  readonly accessToken: string

  @Expose()
  readonly refreshToken: string

  @Expose()
  readonly expiresAt: Date

  @Expose()
  readonly refreshExpiresAt: Date
}
