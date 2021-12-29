import React from "react"
import { View } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import Text from "./Text"

const RepositoryPage = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository({ id, first: 3 })

  if (!repository) {
    return (
      <View>
        <Text>Repository not found</Text>
      </View>
    )
  }

  const onEndReach = () => {
    fetchMore()
  }

  return <RepositoryItem repository={repository} onEndReach={onEndReach} />
}

export default RepositoryPage
