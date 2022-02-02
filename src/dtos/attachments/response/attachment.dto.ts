import { Attachment } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'
import { ContentTypeEnum, FileExtensionEnum } from '../../../enums/index'

@Exclude()
export class AttachmentDto implements Attachment {
  @Expose()
  readonly id: string

  @Expose()
  readonly path: string

  @Expose()
  readonly key: string

  @Expose()
  readonly ext: FileExtensionEnum

  @Expose()
  readonly contentType: ContentTypeEnum

  @Expose()
  readonly signedUrl?: string

  readonly taskId: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
