import { HTTP_METHODS, RouteInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { Navigation } from 'src/services/http/Navigation'
import Organization from 'src/UseCases/Organization/Organization'

const orgRoutes: Array<RouteInterface> = [
  {
    path: '/',
    method: HTTP_METHODS.get,
    handler: Organization.orgList(),
  },
  {
    path: '/',
    method: HTTP_METHODS.post,
    handler: () => {
      console.log('post')
    },
  },
]

const orgRouter = Navigation.createRouter('/org', orgRoutes)

export default orgRouter
