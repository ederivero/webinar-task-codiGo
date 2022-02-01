import express, { Router } from 'express'
import { tasksRoutes } from './routes/tasks.route'
import { userRoutes } from './routes/user.route'

const expressRouter = express.Router()

export function router(app: Router): Router {
  app.use('/api/v1/tasks', tasksRoutes())
  app.use('/api/v1/user', userRoutes())

  return expressRouter
}
