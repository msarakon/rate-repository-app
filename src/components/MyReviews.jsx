import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import useAuthorizedUser from "../hooks/useAuthorizedUser"
import ReviewItem from "./ReviewItem"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { authorizedUser, refetch } = useAuthorizedUser(true)

  const reviews = authorizedUser?.reviews.edges.map(edge => edge.node)

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} showActions refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default MyReviews
