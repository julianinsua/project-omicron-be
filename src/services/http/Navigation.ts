import { Router } from 'express'
import {
  HTTP_METHODS,
  RouteInterface,
  RouterInterface,
} from 'src/Entities/Interfaces/RouterInterfaces'
import isAuthenticated from 'src/util/Middlewares/isAuthenticated'
import isAllowed from 'src/util/Middlewares/isAllowed'

export class Navigation implements RouterInterface {
  routers: Array<Router>

  public constructor() {
    this.routers = []
  }

  public static createRouter(mainPath: string, routes: Array<RouteInterface>): Router {
    const router = Router()

    routes.map(async (route: RouteInterface) => {
      const { isPrivate, permissions, middlewares, handler, method, path } = route
      let namespaceFunctions: any = []

      if (isPrivate) {
        namespaceFunctions.push(isAuthenticated)
      }

      if (permissions) {
        namespaceFunctions.push(isAllowed(permissions))
      }

      if (middlewares) {
        namespaceFunctions.push(...middlewares)
      }

      namespaceFunctions.push(handler)

      switch (method) {
        case HTTP_METHODS.get:
          // @ts-ignore
          router.get(path, namespaceFunctions)
          break
        case HTTP_METHODS.post:
          // @ts-ignore
          router.post(path, namespaceFunctions)
          break
        case HTTP_METHODS.delete:
          // @ts-ignore
          router.delete(path, namespaceFunctions)
          break
        case HTTP_METHODS.put:
          // @ts-ignore
          router.put(path, namespaceFunctions)
          break
        case HTTP_METHODS.patch:
          // @ts-ignore
          router.patch(path, namespaceFunctions)
          break
        default:
          router.use(path, namespaceFunctions)
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
