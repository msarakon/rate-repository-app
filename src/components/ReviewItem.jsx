import React from "react"
import { View, StyleSheet } from "react-native"
import { format, parseISO } from "date-fns"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  review: {
    backgroundColor: "#ffffff",
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

export default ReviewItem
