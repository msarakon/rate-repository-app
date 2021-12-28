import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"

const useRepository = () => {
  const getRepository = id => {
    const { data } = useQuery(GET_REPOSITORY, {
      fetchPolicy: "cache-and-network",
      variables: { id },
    })

    return data?.repository
  }

  return { getRepository }
}

export default useRepository
