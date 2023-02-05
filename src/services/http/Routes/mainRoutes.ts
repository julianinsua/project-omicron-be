import { NextFunction, Request, Response } from 'express'
import { HTTP_METHODS, RouteInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import Authentication from 'src/UseCases/Authentication/Authentication'
import OrganizationRouter from './orgRoutes'

// Here both the handler and the array of middlewares can be outsourced to other files or classes to
// fit whatever need might come. The most important thing is that all the routes now live in files
// there's no need for any further documentation since all routes, methods and handlersr are
// available in this files.

export const mainRoutes: Array<RouteInterface> = [
  {
    handler: (req: Request, res: Response) => {
      console.log('test')
      return res.json({ message: 'pepito', pepito: req.body.pepito })
    },
    path: '/',
    method: HTTP_METHODS.get,
    middlewares: [
      (req: Request, res: Response, next: NextFunction) => {
        req.body.pepito = 'pepito'
        next()
      },
    ],
  },
  {
    handler: Authentication.signup(),
    path: '/signup',
    method: HTTP_METHODS.post,
  },
  {
    handler: Authentication.login(),
    path: '/login',
    method: HTTP_METHODS.post,
  },
  {
    handler: Authentication.forgotPassword(),
    path: '/forgotPassword',
    method: HTTP_METHODS.post,
  },
  {
    handler: Authentication.resetPassword(),
    path: '/resetPassword',
    method: HTTP_METHODS.post,
  },
  {
    handler: OrganizationRouter,
    path: '/org',
    method: HTTP_METHODS.any,
  },
]
