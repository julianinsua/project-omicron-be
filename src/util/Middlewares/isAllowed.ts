import { NextFunction, Request, Response } from 'express'
import forbiddenError from 'src/Entities/Exeptions/ForbiddenError'
import {
  BAD_TOKEN,
  BAD_TOKEN_MSG,
  NOT_ALLOWED,
  NOT_ALLOWED_MSG,
} from 'src/Entities/Exeptions/ExeptionCodes'
import notAuthenticatedError from 'src/Entities/Exeptions/NotAuthenticatedError'

const isAllowed =
  (routePermissions: Array<string>) => async (req: Request, res: Response, next: NextFunction) => {
    // Check authentication, authentication is allways placed first
    if (!req?.body?.isAuthenticated || !req?.body?.userData) {
      throw new notAuthenticatedError(BAD_TOKEN, BAD_TOKEN_MSG)
    }

    const { permissions } = req.body.userData

    for (let routePermission in routePermissions) {
      if (!permissions.includes(routePermission)) {
        throw new forbiddenError(NOT_ALLOWED, NOT_ALLOWED_MSG)
      }
    }
    next()
  }

export default isAllowed
