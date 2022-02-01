import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { find, create, findOne, update } from '../controllers/tasks.controller'
import { authValidator } from '../utils/auth-guard'
const router = express.Router()

export function tasksRoutes(): Router {
  router
    .route('/')
    .get(asyncHandler(authValidator), asyncHandler(find))
    .post(asyncHandler(authValidator), asyncHandler(create))
  router
    .route('/:id')
    .get(asyncHandler(authValidator), asyncHandler(findOne))
    .patch(asyncHandler(authValidator), asyncHandler(update))

  return router
}
