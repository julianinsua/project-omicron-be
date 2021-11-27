import { HTTP_METHODS, RouteInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { NextFunction, Request, Response } from 'express'

// Here both the handler and the array of middlewares can be outsourced to other files or classes to
// fit whatever need might come. The most important thing is that all the routes now live in files
// there's no need for any further documentation since all routes, methods and handlersr are
// available in this files.

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
