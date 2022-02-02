import express, { Router } from 'express'
import { attachmentsRoutes } from './routes/attachments.route'
import { tasksRoutes } from './routes/tasks.route'
import { userRoutes } from './routes/user.route'

const expressRouter = express.Router()

export function router(app: Router): Router {
  app.use('/api/v1', tasksRoutes())
  app.use('/api/v1/user', userRoutes())
  app.use('/api/v1/attachment', attachmentsRoutes())

  return expressRouter
}
