import { AuthErrorCodes } from './auth-error-codes.enum';

export const ErrorMessages = {
  [AuthErrorCodes.WRONG_PASSWORD]: 'Invalid email or password.',
  [AuthErrorCodes.USER_NOT_FOUND]: 'User not found.',
  [AuthErrorCodes.EMAIL_EXIST]: 'Email alredy exist',
  default: 'Something went wrong...'
}
