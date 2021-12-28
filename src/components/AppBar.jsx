import React from "react"
import Constants from "expo-constants"
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { useHistory } from "react-router-native"
import { Link } from "react-router-native"
import theme from "../theme"
import useAuthorizedUser from "../hooks/useAuthorizedUser"
import useSignOut from "../hooks/useSignOut"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
    padding: 20,
    fontWeight: theme.fontWeights.bold,
  },
})

const AppBar = () => {
  const { signOut } = useSignOut()
  const { authorizedUser } = useAuthorizedUser()
  const history = useHistory()

  const handleSignOut = async () => {
    await signOut()
    history.push("/signin")
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {authorizedUser ? (
          <>
            <Link to="/">
              <Text style={styles.text}>Repositories</Text>
            </Link>
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
