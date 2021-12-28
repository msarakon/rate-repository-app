import { StatusBar } from "expo-status-bar"
import { ApolloProvider } from "@apollo/client"
import React from "react"
import { NativeRouter } from "react-router-native"
import createApolloClient from "./src/utils/apolloClient"
import Main from "./src/components/Main"
import Constants from "expo-constants"

const App = () => {
  const apolloUri = Constants.manifest.extra.apolloUri
  const apolloClient = createApolloClient(apolloUri)

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}

export default App
