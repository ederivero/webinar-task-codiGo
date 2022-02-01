import { Expose, Exclude } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { TaskStatusEnum } from '../../../enums'
import { BaseDto } from '../../base.dto'

@Exclude()
export class CreateTaskDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @Expose()
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  readonly status: TaskStatusEnum
}
