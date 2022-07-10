import {
  IErrorService,
  IGithubOauth,
  IGithubOauthOptions,
} from '../../interfaces/github-oauth'
import axios from 'axios'
import ErrorsService from '../errors'

class GithubOauthClient implements IGithubOauth {
  private errorService

  constructor(
    private readonly options: IGithubOauthOptions,
    errorService?: IErrorService,
  ) {
    this.errorService = errorService || new ErrorsService()
  }

  async getAccessToken(authCode: string) {
    try {
      const {
        clientId: client_id,
        clientSecret: client_secret,
        scope,
        redirectUri: redirect_uri,
      } = this.options

      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        { code: authCode, client_id, client_secret, scope, redirect_uri },
      )

      switch (true) {
        case /incorrect_client_credentials/i.test(data):
          return this.errorService.getInvalidCredentialsError()

        case /redirect_uri_mismatch/i.test(data):
          return this.errorService.getError('Redirect Url mismatch')

        case /bad_verification_code/i.test(data):
          return this.errorService.getError('The provided authCode is invalid')

        default:
          this.errorService.getUnknownError()
      }

      const [accessToken] = data.split('access_token=')[1].split('&scope')

      return accessToken
    } catch (err: any) {
      if (err.response.status === 404)
        return this.errorService.getInvalidCredentialsError()
      this.errorService.getUnknownError()
    }
  }

  async getUserInfo(accessToken: string) {
    try {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return data
    } catch (err: any) {
      return err.response.data
    }
  }
}

export default GithubOauthClient
