import { HTTP_METHODS, RouteInterface } from '../../../Entities/Interfaces/RouterInterfaces'
import { NextFunction, Request, Response } from 'express'

export const mainRoutes: Array<RouteInterface> = [
  {
    handler: (req: Request, res: Response) => {
      res.json({ message: 'pepito', pepito: req.body.pepito })
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
]
