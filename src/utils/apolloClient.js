import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const createApolloClient = (authStorage, uri) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    } catch (e) {
      return {
        headers,
      }
    }
  })

  const httpLink = createHttpLink({ uri })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
