import { Request } from 'express'
import { requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'

abstract class GenericAdapter {
  //prevents depending on framework's request on use cases.
  protected static getRequest(req: Request): requestInterface {
    const { body, url, query, params } = req
    const request: requestInterface = { url }
    if (body) request.body = body
    if (query) request.query = query
    if (params) request.params = params

    return request
  }
}

export default GenericAdapter
