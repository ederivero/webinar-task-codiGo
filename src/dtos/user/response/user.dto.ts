import { Exclude, Expose } from 'class-transformer'
import { BaseDto } from '../../../dtos/base.dto'

@Exclude()
export class UserDto extends BaseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly fullName: string

  @Expose()
  readonly email: string

  readonly password: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
