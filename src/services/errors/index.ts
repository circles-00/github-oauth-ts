import { IErrorService } from '../../interfaces/github-oauth'

class ErrorsService implements IErrorService {
  getError(message: string) {
    return {
      status: 'error',
      message: message,
    }
  }

  getInvalidCredentialsError() {
    return this.getError('Invalid Credentials')
  }

  getUnknownError() {
    return this.getError('Invalid Credentials')
  }
}

export default ErrorsService
