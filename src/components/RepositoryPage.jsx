import React from "react"
import { View } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import Text from "./Text"

const RepositoryPage = () => {
  const { id } = useParams()
  const { getRepository } = useRepository()

  const repository = getRepository(id)

  if (!repository) {
    return (
      <View>
        <Text>Repository not found</Text>
      </View>
    )
  }

  return <RepositoryItem repository={repository} />
}

export default RepositoryPage
