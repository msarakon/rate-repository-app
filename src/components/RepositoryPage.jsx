import React from "react"
import { View, Pressable, StyleSheet } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import Text from "./Text"
import * as Linking from "expo-linking"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    padding: 12,
    fontWeight: theme.fontWeights.bold,
  },
})

const RepositoryPage = () => {
  const { id } = useParams()
  const { getRepository } = useRepository()

  const repository = getRepository(id)

  const openInGithub = () => {
    Linking.openURL(repository.url)
  }

  if (!repository) {
    return <View></View>
  }

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} />
      <Pressable style={styles.button} onPress={openInGithub}>
        <Text style={styles.buttonText}>Open in Github</Text>
      </Pressable>
    </View>
  )
}

export default RepositoryPage
