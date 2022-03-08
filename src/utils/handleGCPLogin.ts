import { execute as executey } from '@yarnpkg/shell'
import { GCPLogin, getGoogleAuthTokenCommand } from '../Constants/index.js'
import execute from './execute.js'

export default async function handleGCPLogin() {
  let auth_token: string = ''
  let exit_code = await executey(getGoogleAuthTokenCommand)
  if (exit_code == 0) {
    await execute(getGoogleAuthTokenCommand, function (output: any) {
      auth_token = output
    })
  }
  if (!auth_token) {
    await execute(GCPLogin, function (output: any) {})
    await execute(getGoogleAuthTokenCommand, function (output: any) {
      auth_token = output
    })
  }
  return auth_token
}
