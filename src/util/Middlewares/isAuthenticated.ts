import { Request } from 'express'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import CryptService from 'src/services/crypt/CryptService'

const isAuthenticated = async (req: Request) => {
  const authHeader: any = req.get('Authorization')

  if (!authHeader) {
    throw { error: new Error('Not Authenticated'), status: HTTP_CODES.notAuthenticated }
  }

  const token = authHeader.split(' ')[1]
  let decodedToken: string
  try {
    /*
      TODO Not sure about using the service here, this middleware only uses one function but
       depends an all the service class. maybe I can create a helper and use it on the service
       and here.
    */
    const cryptService = new CryptService()
    decodedToken = await cryptService.verifyToken(token)
    if (!decodedToken) {
      throw { error: new Error('Not Authenticated'), status: HTTP_CODES.notAuthenticated }
    }
    req.body.userData = decodedToken
    req.body.isAuthenticated = true
  } catch (e: any) {
    if (!e.status) {
      e.status = HTTP_CODES.internal
    }
    if (!e.error) {
      e.error = new Error('Internal error')
    }
    throw e
  }
}

export default isAuthenticated
