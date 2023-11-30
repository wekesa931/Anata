/* eslint-disable no-console */
import fetch from 'cross-fetch'
import jwt_decode from 'jwt-decode'
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { onError } from '@apollo/client/link/error'
import constants from 'src/config/constants'
import storage from 'src/storage/secure-storage'
import refreshToken from 'src/utils/auth/refresh-token'
import { RetryLink } from '@apollo/client/link/retry'

const retryLink = new RetryLink({
  attempts: {
    retryIf: (error) => {
      if (error) {
        const { statusCode } = error as any
        if (statusCode >= 500) {
          return true
        }
      }

      return false
    },
  },
})

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

const v1Link = new HttpLink({
  uri: `${process.env.API_URL}/scribe/graphql/`,
  credentials: 'same-origin',
  fetch,
})

const v2Link = new HttpLink({
  uri: `${process.env.API_URL}/scribe/v2/graphql/`,
  credentials: 'same-origin',
  fetch: fetch as any,
})

const searchLink = new HttpLink({
  uri: `${process.env.API_URL}/scribe/opensearch/graphql/`,
  credentials: 'same-origin',
  fetch: fetch as any,
})

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
      if (
        (networkError as any).statusCode === 403 ||
        (networkError as any).statusCode === 401
      ) {
        return fromPromise(refreshToken())
          .filter((value) => Boolean(value))
          .flatMap(({ data }) => {
            const userObj: any = jwt_decode(data.id_token)
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

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    retryLink,
    handleErrors,
    authMiddleWare().concat(
      // 3 clients in use, v2, v1 and opensearch all with different endpoints
      ApolloLink.split(
        (operation) => operation.getContext().clientName === 'v2',
        v2Link,
        ApolloLink.split(
          (operation) => operation.getContext().clientName === 'search',
          searchLink,
          v1Link
        )
      )
    ),
  ]),
  cache: new InMemoryCache(),
})
export default apolloClient
