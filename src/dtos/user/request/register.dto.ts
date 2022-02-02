import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { BaseDto } from '../../../dtos/base.dto'

export class RegisterDto extends BaseDto {
  @IsEmail()
  readonly email: string

  @Matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&?])[A-Za-z\d@$!%*#&?]{6,}/,
    {
      message:
        'password must have 1 upper letter, 1 lower letter, 1 number and 1 special character and at least 6 characters',
    },
  )
  readonly password: string

  @IsNotEmpty()
  @IsString()
  readonly fullName: string
}
