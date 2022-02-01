export type JWTPayloadType = {
  jti: string
  aud?: string | null
  secret?: string
  expiresIn?: string
}
