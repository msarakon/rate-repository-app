import React from "react"
import { TextInput, View, Pressable, StyleSheet } from "react-native"
import { useHistory } from "react-router-native"
import { Formik, useField } from "formik"
import * as yup from "yup"
import Text from "./Text"
import theme from "../theme"
import useSignUp from "../hooks/useSignUp"
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
  passwordConfirmation: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")])
    .required("Password confirmation is required"),
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

const SignUpForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
      />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm handleSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signUn] = useSignUp()
  const [signIn] = useSignIn()
  const history = useHistory()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await signUn({ username, password })
      await signIn({ username, password })
      history.push("/repositories")
    } catch (error) {
      console.log(error)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
