import { NextFunction, Request, Response, Router } from 'express'

export interface RouterInterface {
  availableRouters: Array<Router>
}

export interface RouteInterface {
  handler: Handler | Promise<Handler> | Router
  path: string
  method?: HTTP_METHODS
  isPrivate?: boolean
  middlewares?: Array<Middleware> // Array of middleware functions, but the return shouldn't be any, I have to investigate this
  permissions?: Array<string>
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any

export type Handler = (req: Request, res: Response, next: NextFunction) => any

export interface requestInterface {
  url: string
  body?: Object
  query?: Object
  params?: Object
}

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
  badRequest = 400,
  notAuthenticated = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  internal = 500,
}
