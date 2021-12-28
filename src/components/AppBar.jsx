import React from "react"
import Constants from "expo-constants"
import { View, StyleSheet, Text, ScrollView } from "react-native"
import { Link } from "react-router-native"
import theme from "../theme"

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
