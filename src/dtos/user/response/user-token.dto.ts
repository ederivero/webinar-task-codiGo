import { Exclude, Expose } from 'class-transformer'
import { UserDto } from './user.dto'
import { JwtTokenDto } from './jwt-token.dto'

@Exclude()
export class UserWithAccessTokenDto extends JwtTokenDto {
  @Expose()
  readonly user: UserDto
}
