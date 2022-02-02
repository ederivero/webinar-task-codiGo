import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  find,
  create,
  findOne,
  update,
  deleteTask,
} from '../controllers/tasks.controller'
import { authValidator } from '../utils/auth-guard'
const router = express.Router()

export function tasksRoutes(): Router {
  router
    .route('/tasks')
    .get(asyncHandler(authValidator), asyncHandler(find))
    .post(asyncHandler(authValidator), asyncHandler(create))
  router
    .route('/task/:id')
    .get(asyncHandler(authValidator), asyncHandler(findOne))
    .patch(asyncHandler(authValidator), asyncHandler(update))
    .delete(asyncHandler(authValidator), asyncHandler(deleteTask))

  return router
}
