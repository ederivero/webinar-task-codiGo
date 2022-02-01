import { Exclude, Expose } from 'class-transformer'
import { TaskStatusEnum } from '../../../enums'

@Exclude()
export class TaskDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly status: TaskStatusEnum

  @Expose()
  readonly attachment: any
}
