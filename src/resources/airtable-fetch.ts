import axios from 'axios'
import jwt_decode from 'jwt-decode'
import history from '../constants/history'
import constants from '../constants/storage'
import storage from '../helpers/secure-storage'
import refreshToken from './refresh-google-auth-token'

const baseUrl = `${process.env.API_URL}/airtable`

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
            const userObj = jwt_decode(data.id_token)
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
  try {
    const response = await axios({
      url: `${baseUrl}/${table}`,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        'Content-Type': 'application/json',
      },
      method: method || 'GET',
      data: method === 'GET' ? null : data,
    })
    return response.data
  } catch (e) {
    return e.message
  }
}

export default airtableFetch
