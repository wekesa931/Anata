import axios from 'axios'
import storage from '../helpers/secure-storage'
import keys from '../constants/storage'

let refreshTokenRequest: Promise<any> | null

const getFormData = () => {
  const formdata = new FormData()
  formdata.append('client_id', process.env.GOOGLE_CLIENT_ID || '')
  formdata.append('client_secret', process.env.GOOGLE_CLIENT_SECRET || '')
  formdata.append('refresh_token', storage.get(keys.REFRESH_TOKEN))
  formdata.append('grant_type', 'refresh_token')
  return formdata
}
const refreshToken = async () => {
  if (!refreshTokenRequest) {
    refreshTokenRequest = axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      data: getFormData(),
    }).then((response) => {
      refreshTokenRequest = null
      return response
    })
  }
  return refreshTokenRequest
}

export default refreshToken
