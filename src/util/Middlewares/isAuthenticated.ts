import { NextFunction, Request, Response } from 'express'
import CryptService from 'src/services/crypt/CryptService'
import notAuthenticatedError from 'src/Entities/Exeptions/NotAuthenticatedError'
import {
  INTERNAL_ERROR,
  INTERNAL_ERROR_MSG,
  INVALID_TOKEN,
  INVALID_TOKEN_MSG,
  NO_TOKEN,
  NO_TOKEN_MSG,
} from 'src/Entities/Exeptions/ExeptionCodes'
import BaseError from 'src/Entities/Exeptions/BaseError'
import InternalError from 'src/Entities/Exeptions/InternalError'
import NotAuthenticatedError from 'src/Entities/Exeptions/NotAuthenticatedError'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.get('Authorization')

  if (!authHeader) {
    throw { error: new notAuthenticatedError(NO_TOKEN, NO_TOKEN_MSG) }
  }

  try {
    const [, token] = authHeader.split(' ')
    let decodedToken: string

    decodedToken = await CryptService.verifyToken(token)

    if (!decodedToken) {
      throw new NotAuthenticatedError(INVALID_TOKEN, INVALID_TOKEN_MSG)
    }
    req.body.userData = decodedToken
    req.body.isAuthenticated = true
    return next()
  } catch (e: any) {
    if (e instanceof BaseError) {
      throw e
    }
    throw new InternalError(INTERNAL_ERROR, false, INTERNAL_ERROR_MSG, { error: e })
  }
}

export default isAuthenticated
