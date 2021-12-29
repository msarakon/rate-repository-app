import React from "react"
import { FlatList, View, StyleSheet, Pressable } from "react-native"
import { useHistory } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  onSelectRepository,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectRepository(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const history = useHistory()

  const onSelectRepository = id => {
    history.push("/repositories/" + id)
  }
  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={onSelectRepository}
    />
  )
}

export default RepositoryList
