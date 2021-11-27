import { Express, NextFunction, Request, Response } from 'express'

export interface RouterInterface {
  createRouter(routes: Array<RouteInterface>, mainPath: string): Express
}

export interface RouteInterface {
  handler: Handler
  path: string
  method?: HTTP_METHODS
  middlewares?: Array<Middleware> // Array of middleware functions, but the return shouldn't be any, I have to investigate this
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any

export type Handler = (req: Request, res: Response, next?: NextFunction) => any

export enum HTTP_METHODS {
  post = 'POST',
  get = 'GET',
  delete = 'DELETE',
  put = 'PUT',
  any = '',
}
