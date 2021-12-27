import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, Alert, Pressable } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row"
  },
  text: {
    color: "#ffffff",
    padding: 20
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Link to="/">
      <Text style={styles.text}>Repositories</Text>
    </Link>
    <Link to="/signin">
      <Text style={styles.text}>Sign In</Text>
    </Link>
  </View>;
};

export default AppBar;