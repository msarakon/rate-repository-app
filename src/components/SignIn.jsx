import React from "react"
import { TextInput, View, Pressable, StyleSheet } from "react-native"
import { useHistory } from "react-router-native"
import { Formik, useField } from "formik"
import * as yup from "yup"
import Text from "./Text"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"

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
  username: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
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
        style={[styles.input, meta.error ? styles.inputInvalid : undefined]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

const SignInForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const history = useHistory()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await signIn({ username, password })
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
