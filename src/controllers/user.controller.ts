import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { UnprocessableEntity } from 'http-errors'
import { LoginDto } from '../dtos/user/request/login.dto'
import { UserWithAccessTokenDto } from '../dtos/user/response/user-token.dto'
import { UserService } from '../services/user.service'

export async function login(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(LoginDto, req.body)
  await dto.isValid()

  const users = await UserService.login(dto)

  res.status(200).json(plainToClass(UserWithAccessTokenDto, users))
}

export async function logout(req: Request, res: Response): Promise<void> {
  if (!req.headers.authorization) {
    throw new UnprocessableEntity(
      'This request should have a token in auth headers',
    )
  }

  await UserService.logout(req.headers.authorization.split(' ')[1])
  res.status(204).send()
}
