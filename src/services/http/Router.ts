import {
  HTTP_METHODS,
  Middleware,
  RouteInterface,
  RouterInterface,
} from '../../Entities/Interfaces/RouterInterfaces'
import { Express, Router } from 'express'

export class Navigation implements RouterInterface {
  app: Express

  public constructor(app: Express) {
    this.app = app
  }

  public createRouter(routes: Array<RouteInterface>, mainPath: string): Express {
    const router = Router()

    routes.map((route: RouteInterface) => {
      let namespaceFunctions: Array<Middleware | Function> | Function

      if (route.middlewares) {
        namespaceFunctions = [...route.middlewares]
        namespaceFunctions.push(route.handler)
      } else {
        namespaceFunctions = route.handler
      }

      switch (route.method) {
        case HTTP_METHODS.get:
          // @ts-ignore
          router.get(route.path, namespaceFunctions)
          break
        case HTTP_METHODS.post:
          // @ts-ignore
          router.post(route.path, namespaceFunctions)
          break
        case HTTP_METHODS.delete:
          // @ts-ignore
          router.delete(route.path, namespaceFunctions)
          break
        case HTTP_METHODS.put:
          // @ts-ignore
          router.put(route.path, namespaceFunctions)
          break
        default:
          // @ts-ignore
          router.use(route.path, namespaceFunctions)
      }
    })
    this.app.use(mainPath, router)
    return this.app
  }
}
