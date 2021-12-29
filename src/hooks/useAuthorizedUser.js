import { useQuery } from "@apollo/client"
import { GET_AUTHORIZED_USER } from "../graphql/queries"

const useAuthorizedUser = (includeReviews = false) => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews },
  })

  return { authorizedUser: data?.authorizedUser }
}

export default useAuthorizedUser
