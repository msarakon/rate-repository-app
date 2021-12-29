import React, { useEffect, useState } from "react"
import { FlatList, View, StyleSheet, Pressable } from "react-native"
import ModalSelector from "react-native-modal-selector"
import { useHistory } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const sortByOptions = [
  { key: "latest", label: "Latest repositories" },
  { key: "best", label: "Highest rated repositories" },
  { key: "worst", label: "Lowest rated repositories" },
]

export const RepositoryListContainer = ({
  repositories,
  onSelectRepository,
  selectedSortBy,
  setSelectedSortBy,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <ModalSelector
          data={sortByOptions}
          initValue="Select an item..."
          onChange={option => setSelectedSortBy(option.key)}
          selectedKey={selectedSortBy}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectRepository(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[0].key)
  const { repositories } = useRepositories(selectedSortBy)
  const history = useHistory()

  const onSelectRepository = id => {
    history.push("/repositories/" + id)
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={onSelectRepository}
      selectedSortBy={selectedSortBy}
      setSelectedSortBy={setSelectedSortBy}
    />
  )
}

export default RepositoryList
