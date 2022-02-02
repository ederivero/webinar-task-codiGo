import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'
import {
  ContentTypeEnum,
  FileExtensionEnum,
  ParentEnum,
} from '../../../enums/index'
import { BaseDto } from '../../base.dto'

export class CreateAttachmentDto extends BaseDto {
  @IsNotEmpty()
  @IsEnum(ContentTypeEnum, {
    message:
      'contentType must be a valid enum: image/png, image/jpg, image/jpeg',
  })
  readonly contentType: ContentTypeEnum

  @IsNotEmpty()
  @IsEnum(FileExtensionEnum, {
    message: 'ext must be a valid enum: png, jpg, jpeg',
  })
  readonly ext: FileExtensionEnum

  @IsNotEmpty()
  @IsEnum(ParentEnum, { message: 'parentType must be a valid enum: TASK' })
  readonly parentType: ParentEnum

  @IsNotEmpty()
  readonly filename: string

  @IsNotEmpty()
  @IsUUID()
  readonly taskId: string
}
