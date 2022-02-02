import { plainToClass, plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { Unauthorized } from 'http-errors'
import { CreateTaskDto } from '../dtos/tasks/request/create-task.dto'
import { UpdateTaskDto } from '../dtos/tasks/request/update-task.dto'
import { TaskDto } from '../dtos/tasks/response/task.dto'
import { TasksService } from '../services/tasks.service'

export async function find(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }
  const tasks = await TasksService.find(req.user.id)

  res.status(200).json(plainToInstance(TaskDto, tasks))
}

export async function create(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  const dto = plainToClass(CreateTaskDto, req.body)
  await dto.isValid()

  const user = await TasksService.create(dto, req.user.id)

  res.status(201).json(plainToClass(TaskDto, user))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  const task = await TasksService.findOne(req.params.id, req.user.id)

  res.status(200).json(plainToClass(TaskDto, task))
}

export async function update(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  const dto = plainToClass(UpdateTaskDto, req.body)
  await dto.isValid()

  const user = await TasksService.update(req.params.id, dto, req.user.id)

  res.status(200).json(plainToClass(TaskDto, user))
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new Unauthorized('Incorrect user')
  }

  await TasksService.delete(req.params.id, req.user.id)

  res.status(204).send()
}
