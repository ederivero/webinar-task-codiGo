import { Expose, Exclude } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { TaskStatusEnum } from '../../../enums'
import { BaseDto } from '../../base.dto'

@Exclude()
export class UpdateTaskDto extends BaseDto {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum, {
    message: 'status must be a valid enum value: TODO, DONE or DOING',
  })
  readonly status: TaskStatusEnum
}
