import { useQuery } from "@apollo/client"
import { GET_AUTHORIZED_USER } from "../graphql/queries"

const useAuthorizedUser = () => {
  const { data, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  })

  return { authorizedUser: data?.authorizedUser, loading }
}

export default useAuthorizedUser
