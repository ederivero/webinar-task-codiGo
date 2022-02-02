import { Task } from '@prisma/client'
import { NotFound, UnprocessableEntity } from 'http-errors'
import { plainToClass, plainToInstance } from 'class-transformer'
import { CreateTaskDto } from '../dtos/tasks/request/create-task.dto'
import { UpdateTaskDto } from '../dtos/tasks/request/update-task.dto'
import { TaskDto } from '../dtos/tasks/response/task.dto'
import { prisma } from '../prisma'
import { s3 } from '../s3'
import { AttachmentService } from './attachment.service'

export class TasksService {
  static async find(userId: string): Promise<TaskDto[]> {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: { attachment: true },
      where: { userId },
    })

    const tasksWithAttachment = tasks.map((task) => ({
      ...task,
      attachment: task.attachment
        ? {
            ...task.attachment,
            signedUrl: AttachmentService.getSignedUrl(
              `${task.attachment.path}/${task.attachment.key}.${task.attachment.ext}`,
            ),
          }
        : undefined,
    }))

    return plainToInstance(TaskDto, tasksWithAttachment)
  }

  static async create(input: CreateTaskDto, userId: string): Promise<Task> {
    return prisma.task.create({ data: { ...input, userId } })
  }

  static async findOne(id: string, userId: string): Promise<TaskDto> {
    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { attachment: true },
      rejectOnNotFound: true,
    })

    return plainToClass(TaskDto, {
      ...task,
      attachment: task.attachment
        ? {
            ...task.attachment,
            signedUrl: AttachmentService.getSignedUrl(
              `${task.attachment?.path}/${task.attachment?.key}.${task.attachment?.ext}`,
            ),
          }
        : undefined,
    })
  }

  static async update(
    id: string,
    input: UpdateTaskDto,
    userId: string,
  ): Promise<TaskDto> {
    await TasksService.findOne(id, userId)

    const task = await prisma.task.update({
      data: input,
      where: {
        id,
      },
    })

    return plainToClass(TaskDto, task)
  }

  static async delete(id: string, userId: string): Promise<void> {
    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { attachment: true },
      rejectOnNotFound: false,
    })

    if (!task) {
      throw new NotFound(`The task with ${id} does not exist`)
    }

    if (task.attachment) {
      s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET ?? '',
          Key: `${task.attachment.path}/${task.attachment.key}.${task.attachment.ext}`,
        },
        (err) => {
          if (err) {
            throw new UnprocessableEntity(err?.message)
          }
        },
      )
      await prisma.attachment.delete({ where: { id: task.attachment.id } })
    }
    await prisma.task.delete({ where: { id } })
  }
}
