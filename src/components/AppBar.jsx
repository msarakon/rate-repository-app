import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, Alert, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  text: {
    color: "#ffffff",
    padding: 20
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable onPress={() => Alert.alert("Boop beep")}>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;