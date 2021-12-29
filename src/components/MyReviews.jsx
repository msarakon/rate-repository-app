import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import useAuthorizedUser from "../hooks/useAuthorizedUser"
import ReviewItem from "./ReviewItem"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
})

const MyReviews = () => {
  const { authorizedUser } = useAuthorizedUser(true)

  const reviews = authorizedUser?.reviews.edges.map(edge => edge.node)

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  )
}

export default MyReviews
