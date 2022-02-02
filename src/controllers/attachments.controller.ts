import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { Unauthorized } from 'http-errors'
import { CreateAttachmentDto } from '../dtos/attachments/request/create-attachment.dto'
import { AttachmentService } from '../services/attachment.service'

export async function create(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  const dto = plainToClass(CreateAttachmentDto, req.body)
  await dto.isValid()

  const attachment = await AttachmentService.create(dto)

  res.status(201).json(plainToClass(CreateAttachmentDto, attachment))
}

export async function deleteAttachment(
  req: Request,
  res: Response,
): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  await AttachmentService.delete(req.params.id)

  res.status(204).send()
}
