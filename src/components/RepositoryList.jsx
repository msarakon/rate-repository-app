import React, { useState } from "react"
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native"
import { useDebounce } from "use-debounce"
import ModalSelector from "react-native-modal-selector"
import { useHistory } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
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
  searchKeyword,
  setSearchKeyword,
  onEndReach,
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
        <View>
          <TextInput
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Search from repositories..."
            style={styles.input}
          />
          <ModalSelector
            data={sortByOptions}
            initValue="Select an item..."
            onChange={option => setSelectedSortBy(option.key)}
            selectedKey={selectedSortBy}
          />
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectRepository(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryList = () => {
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[0].key)
  const [searchKeyword, setSearchKeyword] = useState()
  const [searchKeywordDebounced] = useDebounce(searchKeyword, 300)
  const history = useHistory()

  const { repositories, fetchMore } = useRepositories({
    first: 6,
    selectedSortBy,
    searchKeyword: searchKeywordDebounced,
  })

  const onSelectRepository = id => {
    history.push("/repositories/" + id)
  }

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={onSelectRepository}
      selectedSortBy={selectedSortBy}
      setSelectedSortBy={setSelectedSortBy}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
