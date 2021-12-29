import React from "react"
import { StyleSheet, View } from "react-native"
import { Route, Switch, Redirect } from "react-router-native"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import SignIn from "./SignIn"
import RepositoryPage from "./RepositoryPage"
import ReviewPage from "./ReviewPage"
import SignUp from "./SignUp"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories" exact>
          <RepositoryList />
        </Route>
        <Route path="/repositories/:id">
          <RepositoryPage />
        </Route>
        <Route path="/create-review">
          <ReviewPage />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Redirect to="/repositories" />
      </Switch>
    </View>
  )
}

export default Main
