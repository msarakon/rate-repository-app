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

const useRepositories = ({ first, sortBy, searchKeyword }) => {
  const variables = {
    ...resolveOrder(sortBy),
    first,
    searchKeyword,
  }

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (canFetchMore) {
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      })
    }
  }

  return { repositories: data?.repositories, fetchMore: handleFetchMore }
}

export default useRepositories
