import {
  HTTP_METHODS,
  RouteInterface,
  RouterInterface,
} from 'src/Entities/Interfaces/RouterInterfaces'
import { Router } from 'express'

export class Navigation implements RouterInterface {
  routers: Array<Router>

  public constructor() {
    this.routers = []
  }

  public static createRouter(mainPath: string, routes: Array<RouteInterface>): Router {
    const router = Router()

    routes.map(async (route: RouteInterface) => {
      let namespaceFunctions: any

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
        case HTTP_METHODS.patch:
          // @ts-ignore
          router.patch(route.path, namespaceFunctions)
          break
        default:
          // @ts-ignore
          router.use(route.path, namespaceFunctions)
      }
    })
    return router
  }

  protected addRouter(mainPath: string, routes: Array<RouteInterface>): void {
    const newRouter = Navigation.createRouter(mainPath, routes)
    this.routers.push(newRouter)
  }

  public get availableRouters() {
    return this.routers
  }
}
