import React, { useState } from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { Formik, useField } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

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
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ handleSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passwordField, passwordMeta, passwordHelpers] = useField("password");

  const [isValidating, setValidating] = useState(false);

  const onSubmit = () => {
    setValidating(true);
    if (!usernameMeta.error && !passwordMeta.error) {
      handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
        style={[
          styles.input,
          usernameMeta.error ? styles.inputInvalid : undefined,
        ]}
        error={usernameMeta.error}
      />
      <Text style={styles.errorText}>{isValidating && usernameMeta.error}</Text>
      <TextInput
        placeholder="Password"
        value={passwordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
        style={[
          styles.input,
          passwordMeta.error ? styles.inputInvalid : undefined,
        ]}
        error={passwordMeta.error}
      />
      <Text style={styles.errorText}>{isValidating && passwordMeta.error}</Text>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
