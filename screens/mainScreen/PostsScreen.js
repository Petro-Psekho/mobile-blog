import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  // console.log('route.params', route.params.image);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log('posts', posts);

  return (
    <View style={styles.container}>
      <Text>PostsScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostsScreen;
