import { nanoid } from 'nanoid'
import { plainToClass } from 'class-transformer'
import { NotFound } from 'http-errors'
import { s3 } from '../s3'
import { prisma } from '../prisma'
import { CreateAttachmentDto } from '../dtos/attachments/request/create-attachment.dto'
import { AttachmentDirectoryEnum } from '../enums/index'
import { AttachmentDto } from '../dtos/attachments/response/attachment.dto'

export class AttachmentService {
  static async create(input: CreateAttachmentDto) {
    const path = AttachmentDirectoryEnum[input.parentType].replace(
      '{uuid}',
      input.taskId,
    )

    const attachment = await prisma.attachment.create({
      data: {
        taskId: input.taskId,
        contentType: input.contentType,
        key: `${nanoid()}-${input.filename}`,
        ext: input.ext,
        path,
      },
    })

    const signedUrl = s3.getSignedUrl('putObject', {
      Key: `${path}/${attachment.key}.${attachment.ext}`,
      ContentType: attachment.contentType,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })

    return plainToClass(AttachmentDto, { signedUrl, ...attachment })
  }

  static getSignedUrl(path: string) {
    return s3.getSignedUrl('getObject', {
      Key: path,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })
  }

  static async delete(id: string): Promise<void> {
    const attachment = await prisma.attachment.findUnique({
      where: { taskId: id },
      rejectOnNotFound: false,
    })

    if (!attachment) {
      throw new NotFound('The task does not have an attachment')
    }

    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET ?? '',
      Key: `${attachment.path}/${attachment.key}.${attachment.ext}`,
    })

    try {
      await prisma.attachment.delete({ where: { taskId: id } })
    } catch (error) {
      throw new NotFound("Couldn't find Attachment")
    }
  }
}
