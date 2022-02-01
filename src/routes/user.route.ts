import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { login, logout } from '../controllers/user.controller'

const router = express.Router()

export function userRoutes(): Router {
  router.post('/login', asyncHandler(login))
  router.post('/logout', asyncHandler(logout))
  return router
}
