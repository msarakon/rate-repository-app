import React from "react"
import { TextInput, View, Pressable, StyleSheet } from "react-native"
import { useHistory } from "react-router-native"
import { Formik, useField } from "formik"
import * as yup from "yup"
import Text from "./Text"
import theme from "../theme"
import useCreateReview from "../hooks/useCreateReview"

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#b6b6b6",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  inputInvalid: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    padding: 12,
  },
})

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  review: "",
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  text: yup.string(),
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)

  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={[styles.input, showError ? styles.inputInvalid : undefined]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

const ReviewForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm handleSubmit={handleSubmit} />}
    </Formik>
  )
}

const ReviewPage = () => {
  const [createReview] = useCreateReview()
  const history = useHistory()

  const onSubmit = async values => {
    const { repositoryName, ownerName, rating, text } = values

    try {
      const { repositoryId } = await createReview({
        repositoryName,
        ownerName,
        rating: parseInt(rating, 10),
        text,
      })
      history.push("/repositories/" + repositoryId)
    } catch (error) {
      console.log(error)
    }
  }

  return <ReviewFormContainer onSubmit={onSubmit} />
}

export default ReviewPage
