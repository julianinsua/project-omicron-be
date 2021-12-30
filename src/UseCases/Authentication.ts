import { NextFunction, Request, Response } from 'express'
import { Handler, HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import GenericAdapter from 'src/Entities/Models/Server/GenericAdapter'
import Signup from 'src/UseCases/Signup'
import Login from 'src/UseCases/Login'

class Authentication extends GenericAdapter {
  public static signup(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const signUp = new Signup(this.getRequest(req))
        const response = await signUp.handleRequest()
        res.status(HTTP_CODES.ok).json(response)
      } catch (e) {
        if (e) {
          next(e)
        }
      }
    }
  }

  public static login(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const logIn = new Login(this.getRequest(req))
        const response = logIn.handleRequest()
        res.status(HTTP_CODES.ok).json(response)
      } catch (e) {
        if (e) {
          next(e)
        }
      }
    }
  }
}

export default Authentication
