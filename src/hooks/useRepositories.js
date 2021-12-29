import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

const resolveOrder = sortBy => {
  switch (sortBy) {
    case "latest":
      return {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      }
    case "best":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      }
    case "worst":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      }
  }
}

const useRepositories = sortBy => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...resolveOrder(sortBy),
    },
  })

  return { repositories: data?.repositories }
}

export default useRepositories
