import GithubOauthClient from './services/github-oauth'
import { IError, IErrorService } from './interfaces/github-oauth'

export type IGOuathError = IError
export type IGOauthErrorService = IErrorService

export default GithubOauthClient
