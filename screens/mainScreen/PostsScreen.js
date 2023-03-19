import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

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
      <FlatList
        style={{ marginTop: 50 }}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Image source={{ uri: item.image }} style={{ marginHorizontal: 10, height: 200 }} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostsScreen;
