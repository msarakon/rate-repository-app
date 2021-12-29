import React from "react"
import { Alert, View, StyleSheet, Pressable } from "react-native"
import { Link } from "react-router-native"
import { format, parseISO } from "date-fns"
import useDeleteReview from "../hooks/useDeleteReview"
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
  actions: {
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    flex: 1,
  },
  buttonDanger: {
    backgroundColor: theme.colors.danger,
    marginLeft: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    padding: 12,
    fontWeight: theme.fontWeights.bold,
  },
})

const formatDate = str => format(parseISO(str), "dd.MM.yyyy")

const ReviewItem = ({ review, refetch, showActions = false }) => {
  const [deleteReview] = useDeleteReview()

  const onDeleteReview = id => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview(id)
            refetch()
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  return (
    <View>
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
      {showActions && (
        <View style={styles.actions}>
          <Link
            to={`/repositories/${review.repositoryId}`}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Link>
          <Pressable
            onPress={() => onDeleteReview(review.id)}
            style={[styles.button, styles.buttonDanger]}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
