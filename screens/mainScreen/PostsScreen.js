import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PostsScreen = () => {
  return (
    // <View style={styles.container}>

    <Text style={styles.container}>PostsScreen</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default PostsScreen;
