import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const createApolloClient = uri => {
  const httpLink = createHttpLink({ uri })

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
