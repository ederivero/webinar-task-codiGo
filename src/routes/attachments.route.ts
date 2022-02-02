import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { create, deleteAttachment } from '../controllers/attachments.controller'
import { authValidator } from '../utils/auth-guard'
const router = express.Router()

export function attachmentsRoutes(): Router {
  router.route('/').post(asyncHandler(authValidator), asyncHandler(create))
  router
    .route('/:id')
    .delete(asyncHandler(authValidator), asyncHandler(deleteAttachment))

  return router
}
