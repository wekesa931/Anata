/* eslint-disable no-console */
import fetch from 'node-fetch'
import jwt_decode from 'jwt-decode'
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client'
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

const authMiddleWare = () =>
  new ApolloLink((operation, forward) => {
    const token = getTokenFromLocalStorage()
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    }
    return forward(operation)
  })

const createHttpLink = (newVersion = false) => {
  const uri = newVersion
    ? process.env.ANTARA_V2_GRAPHQL
    : process.env.ANTARA_HNOS_BACKEND

  return new HttpLink({
    uri,
    credentials: 'same-origin',
    fetch,
  })
}

const handleErrors = onError(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) {
      if (networkError.statusCode === 403 || networkError.statusCode === 401) {
        return fromPromise(refreshToken())
          .filter((value) => Boolean(value))
          .flatMap(({ data }) => {
            const userObj = jwt_decode(data.id_token)
            storage.set(constants.USER, JSON.stringify({ ...data, ...userObj }))
            const oldHeaders = operation.getContext().headers
            // modify the operation context with a new token
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${data.id_token}`,
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

/** Build a dynamic client based on the version */

const createApolloClient = (newVersion = false) =>
  new ApolloClient({
    link: ApolloLink.from([
      handleErrors,
      authMiddleWare().concat(createHttpLink(newVersion)),
    ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  })

export default createApolloClient
