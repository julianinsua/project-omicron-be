import { validEmail, validPassword } from 'src/util/constants/regularExpressions'
import {
  REQUIRE_EMAIL,
  REQUIRE_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from 'src/Entities/Exeptions/ExeptionCodes'

export const validateEmail = (email: string | undefined) => {
  const emailRule = validEmail
  if (!email?.trim()) return { email: REQUIRE_EMAIL }
  if (!emailRule.exec(email.trim())) return { email: INVALID_EMAIL }
  return {}
}

export const validatePassword = (password: string | undefined) => {
  const passwordRule = validPassword
  if (!password?.trim()) return { password: REQUIRE_PASSWORD }
  if (!passwordRule.exec(password.trim())) return { password: INVALID_PASSWORD }
  return {}
}

export default { validateEmail, validatePassword }
