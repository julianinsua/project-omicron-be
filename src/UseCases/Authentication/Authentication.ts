import { NextFunction, Request, Response } from 'express'
import { Handler, HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import GenericAdapter from 'src/Entities/Models/Server/GenericAdapter'
import Signup from 'src/UseCases/Authentication/SignUp/Signup'
import Login from 'src/UseCases/Authentication/LogIn/Login'
import ForgotPassword from 'src/UseCases/Authentication/ForgotPassword/ForgotPassword'
import ResetPassword from 'src/UseCases/Authentication/ResetPassword/ResetPassword'

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
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const logIn = new Login(this.getRequest(req))
        const response = await logIn.handleRequest()
        res.status(HTTP_CODES.ok).json(response)
      } catch (e) {
        if (e) {
          next(e)
        }
      }
    }
  }

  public static forgotPassword(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const forgotPassword = new ForgotPassword(this.getRequest(req))
        const response = await forgotPassword.handleRequest()
        res.status(HTTP_CODES.ok).json(response)
      } catch (e) {
        if (e) {
          next(e)
        }
      }
    }
  }

  public static resetPassword(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resetPassword = new ResetPassword(this.getRequest(req))
        const response = await resetPassword.handleRequest()
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
