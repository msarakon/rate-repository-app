import { useQuery } from "@apollo/client"
import { GET_AUTHORIZED_USER } from "../graphql/queries"

const useAuthorizedUser = (includeReviews = false) => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews },
  })

  return { authorizedUser: data?.authorizedUser, refetch }
}

export default useAuthorizedUser
