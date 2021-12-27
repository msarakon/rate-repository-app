import React from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { Formik, useField } from "formik";
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

const SignInForm = ({ onSubmit }) => {
  const [usernameField, , usernameHelpers] = useField("username");
  const [passwordField, , passwordHelpers] = useField("password");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={passwordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
        style={styles.input}
      />
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
