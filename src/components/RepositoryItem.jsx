import React from "react"
import { View, StyleSheet, Image } from "react-native"
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

const RepositoryItem = ({ repository }) => {
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
    </View>
  )
}

export default RepositoryItem
