import React from 'react';
import { View, StyleSheet, Text, Alert, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#24292e",
  },
  text: {
    color: "#ffffff"
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