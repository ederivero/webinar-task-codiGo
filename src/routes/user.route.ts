import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { login, logout, register } from '../controllers/user.controller'

const router = express.Router()

export function userRoutes(): Router {
  router.post('/login', asyncHandler(login))
  router.post('/logout', asyncHandler(logout))
  router.post('/register', asyncHandler(register))
  return router
}
