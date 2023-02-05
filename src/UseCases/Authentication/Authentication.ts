import { Handler } from 'src/Entities/Interfaces/RouterInterfaces'
import GenericAdapter from 'src/Entities/Models/Server/GenericAdapter'
import Signup from 'src/UseCases/Authentication/SignUp/Signup'
import Login from 'src/UseCases/Authentication/LogIn/Login'
import ForgotPassword from 'src/UseCases/Authentication/ForgotPassword/ForgotPassword'
import ResetPassword from 'src/UseCases/Authentication/ResetPassword/ResetPassword'

class Authentication extends GenericAdapter {
  public static signup(): Handler {
    const signUp = new Signup()
    return this.createHandler(signUp)
  }

  public static login(): Handler {
    const logIn = new Login()
    return this.createHandler(logIn)
  }

  public static forgotPassword(): Handler {
    const forgotPassword = new ForgotPassword()
    return this.createHandler(forgotPassword)
  }

  public static resetPassword(): Handler {
    const resetPassword = new ResetPassword()
    return this.createHandler(resetPassword)
  }
}

export default Authentication
