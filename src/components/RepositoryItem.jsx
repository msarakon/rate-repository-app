import React from "react"
import { View, StyleSheet, Image, FlatList, Pressable } from "react-native"
import * as Linking from "expo-linking"
import { format, parseISO } from "date-fns"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
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
  },
  review: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  ratingText: {
    fontSize: 20,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewDate: {
    marginTop: 4,
    marginBottom: 6,
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

const formatDate = str => format(parseISO(str), "dd.MM.yyyy")

const ReviewItem = ({ review }) => (
  <View style={styles.review}>
    <View style={styles.rating}>
      <Text color="primary" fontWeight="bold" style={styles.ratingText}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewInfo}>
      <Text fontWeight="bold">{review.user.username}</Text>
      <Text color="textSecondary" style={styles.reviewDate}>
        {formatDate(review.createdAt)}
      </Text>
      <Text>{review.text}</Text>
    </View>
  </View>
)

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

const RepositoryItem = ({ repository }) => {
  const reviews = repository.reviews?.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  )
}

export default RepositoryItem
