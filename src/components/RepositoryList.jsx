import React, { useEffect, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const API_HOST = "192.168.86.89"

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [repositories, setRepositories] = useState()

  const fetchRepositories = async () => {
    const response = await fetch(`http://${API_HOST}:5000/api/repositories`)
    const { edges } = await response.json()
    setRepositories(edges)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item.node} />}
    />
  )
}

export default RepositoryList
