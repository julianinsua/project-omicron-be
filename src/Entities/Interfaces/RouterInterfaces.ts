import { NextFunction, Request, Response, Router } from 'express'

export interface RouterInterface {
  availableRouters: Array<Router>
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
  patch = 'PATCH',
  any = '',
}

export enum HTTP_CODES {
  ok = 200,
  notFound = 400,
}
