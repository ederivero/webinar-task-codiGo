import { IsEmail, Matches } from 'class-validator'
import { BaseDto } from '../../../dtos/base.dto'

export class LoginDto extends BaseDto {
  @IsEmail()
  readonly email: string
  @Matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&?])[A-Za-z\d@$!%*#&?]{6,}/,
  )
  readonly password: string
}
