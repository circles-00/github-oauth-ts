export interface IError {
  status: string
  message: string
}

export interface IAccessToken {
  accessToken: string
}

export interface IGithubOauth {
  getAccessToken: (
    authCode: string,
  ) => Promise<IAccessToken | IError | undefined>
  getUserInfo: (accessToken: string) => Promise<any>
}

export interface IGithubOauthOptions {
  clientId: string
  clientSecret: string
  redirectUri: string
  scope?: string
}

export interface IErrorService {
  getError: (message: string) => IError
  getInvalidCredentialsError: () => IError
  getUnknownError: () => IError
}
