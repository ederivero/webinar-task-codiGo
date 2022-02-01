import { Task } from '@prisma/client'
import { CreateTaskDto } from '../dtos/tasks/request/create-task.dto'
import { UpdateTaskDto } from '../dtos/tasks/request/update-task.dto'
import { prisma } from '../prisma'

export class TasksService {
  static async find(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      where: { userId },
    })
  }

  static async create(input: CreateTaskDto, userId: string): Promise<Task> {
    return prisma.task.create({ data: { ...input, userId } })
  }

  static async findOne(id: string, userId: string): Promise<Task> {
    return prisma.task.findFirst({
      where: { id, userId },
      rejectOnNotFound: true,
    })
  }

  static async update(
    id: string,
    input: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    await TasksService.findOne(id, userId)

    const task = await prisma.task.update({
      data: input,
      where: {
        id,
      },
    })

    return task
  }
}
