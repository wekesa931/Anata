import axios from 'axios'
import jwt_decode from 'jwt-decode'
import history from '../constants/history'
import constants from '../constants/storage'
import storage from '../helpers/secure-storage'
import refreshToken from './refresh-google-auth-token'

const baseUrl = `${process.env.NODE_PROXY_URL}/api`

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
    const {
      config,
      response: { status },
    } = error
    if (config.url === 'https://oauth2.googleapis.com/token') {
      // if refreshing the token failed, enforce login
      return history.push('/login', { from: history.location })
    }
    if (status === 401) {
      return refreshToken().then(({ data }) => {
        const userObj = jwt_decode(data.id_token)
        storage.set(constants.USER, JSON.stringify({ ...data, ...userObj }))
        return axios.request({
          ...error.config,
          headers: {
            Authorization: `Bearer ${data.id_token}`,
          },
        })
      })
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
    data: method === 'GET' ? null : JSON.stringify(data),
  })
  return response.data
}

export default airtableFetch
