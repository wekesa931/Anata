/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import fetch from 'node-fetch'
import jwt_decode from 'jwt-decode'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { onError } from '@apollo/client/link/error'
import constants from '../constants/storage'
import storage from '../helpers/secure-storage'
import refreshToken from './refresh-google-auth-token'

const getTokenFromLocalStorage = () => {
  const user = storage.get(constants.USER)
  if (user) {
    return JSON.parse(user).id_token
  }
  return ''
}

const authToken = getTokenFromLocalStorage()

const authMiddleWare = (token: string) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    }
    return forward(operation)
  })

const httpLink = new HttpLink({
  uri: process.env.ANTARA_HNOS_BACKEND,
  credentials: 'same-origin',
  fetch,
})

const handleErrors = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) {
      if (networkError.statusCode === 403 || networkError.statusCode === 401) {
        refreshToken().then(({ data }) => {
          const userObj = jwt_decode(data.id_token)
          storage.set(constants.USER, JSON.stringify({ ...data, ...userObj }))
          // modify the operation context with a new token
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              Authorization: `Bearer ${data.id_token}`,
            },
          })
          // retry the request, returning the new observable
          return forward(operation)
        })
      }
      console.warn(`[Network error]: ${response}`)
    }
  }
)

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    handleErrors,
    authMiddleWare(authToken).concat(httpLink),
  ]),
  cache: new InMemoryCache(),
})

export default apolloClient
