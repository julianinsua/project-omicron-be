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
    */
    const cryptService = new CryptService()
    decodedToken = await cryptService.verifyToken(token)
  } catch (e) {
    // @ts-ignore
    e.status = HTTP_CODES.internal
    throw e
  }

  if (!decodedToken) {
    const error: any = new Error('Not Authenticated')
    error.status = HTTP_CODES.notAuthenticated
  }
}
