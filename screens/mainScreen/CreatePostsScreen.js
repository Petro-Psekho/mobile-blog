import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CreatePostsScreen = () => {
  const [click, setClick] = useState(null);

  const takePhoto = async () => {
    console.log(click);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setClick}>
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>CLICK</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    // height: 300,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  snapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 220,
    marginBottom: 20,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#fff',
  },
  snap: {
    color: '#fff',
  },
});

export default CreatePostsScreen;
