/*eslint-disable */
import * as rax from 'retry-axios'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import history from 'src/utils/routing/history'
import constants from 'src/config/constants'
import storage from 'src/storage/secure-storage'
import refreshToken from 'src/utils/auth/refresh-token'

const baseUrl = `${process.env.API_URL}/airtable`
rax.attach()

const getTokenFromLocalStorage = () => {
  const user = storage.get(constants.USER)
  if (user) {
    return JSON.parse(user).id_token
  }
  return ''
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error
    if (config.url === 'https://oauth2.googleapis.com/token') {
      // if refreshing the token failed, enforce login
      return history.push('/login', { from: history.location })
    }
    if (response && response.status === 401) {
      return refreshToken().then(
        (res) => {
          if (res && res.data) {
            const { data } = res
            const userObj: any = jwt_decode(data.id_token)
            storage.set(constants.USER, JSON.stringify({ ...data, ...userObj }))
            return axios.request({
              ...error.config,
              headers: {
                Authorization: `Bearer ${data.id_token}`,
              },
            })
          }
          return null
        },
        () => {
          // refreshing the token failed
          return history.push('/login', { from: history.location })
        }
      )
    }
    return Promise.reject(error)
  }
)

const airtableFetch = async (table: string, method?: any, data = {}) => {
  const response = await axios({
    url: `${baseUrl}/${table}`,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      'Content-Type': 'application/json',
    },
    method: method || 'GET',
    data: method === 'GET' ? null : data,
    raxConfig: {
      retry: 5,
      statusCodesToRetry: [[500, 599]],
    },
  })
  return response?.data
}

export default airtableFetch
