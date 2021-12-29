import React from "react"
import { View, StyleSheet, Image, FlatList, Pressable } from "react-native"
import * as Linking from "expo-linking"
import Text from "./Text"
import ReviewItem from "./ReviewItem"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  topContent: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
    margin: 12,
  },
  info: {
    alignItems: "flex-start",
    marginTop: 12,
    marginBottom: 12,
    flex: 1,
  },
  heading: {
    paddingBottom: 8,
  },
  tag: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 4,
  },
  tagText: {
    color: "#ffffff",
  },
  bottomContent: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-around",
  },
  stats: {
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    margin: 12,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    padding: 12,
    fontWeight: theme.fontWeights.bold,
  },
  separator: {
    height: 10,
  },
})

const formatNumber = num => (num >= 1000 ? (num / 1000).toFixed(1) + "k" : num)

const Tag = ({ label, ...props }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText} {...props}>
      {label}
    </Text>
  </View>
)

const Stats = ({ count, label, ...props }) => (
  <View style={styles.stats}>
    <Text style={styles.heading} fontWeight="bold" {...props}>
      {formatNumber(count)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
)

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  const openInGithub = () => {
    Linking.openURL(repository.url)
  }

  return (
    <View style={styles.container} testID="repository-item">
      <View style={styles.topContent}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text
            fontWeight="bold"
            style={styles.heading}
            testID={`${repository.id}-full-name`}
          >
            {repository.fullName}
          </Text>
          <Text color="textSecondary" testID={`${repository.id}-description`}>
            {repository.description}
          </Text>
          <Tag
            label={repository.language}
            testID={`${repository.id}-language`}
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Stats
          count={repository.stargazersCount}
          label="Stars"
          testID={`${repository.id}-stars`}
        />
        <Stats
          count={repository.forksCount}
          label="Forks"
          testID={`${repository.id}-forks`}
        />
        <Stats
          count={repository.reviewCount}
          label="Reviews"
          testID={`${repository.id}-reviews`}
        />
        <Stats
          count={repository.ratingAverage}
          label="Rating"
          testID={`${repository.id}-rating`}
        />
      </View>
      {repository.url && (
        <Pressable style={styles.button} onPress={openInGithub}>
          <Text style={styles.buttonText}>Open in Github</Text>
        </Pressable>
      )}
    </View>
  )
}

const RepositoryItem = ({ repository, onEndReach }) => {
  const reviews = repository.reviews?.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default RepositoryItem
