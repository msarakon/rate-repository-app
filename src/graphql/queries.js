import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          id
          ownerName
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      id
      ownerName
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      url
      reviews(after: $after, first: $first) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      username
    }
  }
`
