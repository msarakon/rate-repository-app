import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { API_HOST } from "./apiHost"

const httpLink = createHttpLink({
  uri: `http://${API_HOST}:5000/graphql`,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
