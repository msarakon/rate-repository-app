import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
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
      reviews {
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
