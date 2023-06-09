import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Button from "../../components/Button";

const CreatePostsScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      Location.requestForegroundPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();

        let location = await Location.getCurrentPositionAsync({});
        console.log("latitude", location.coords.latitude);
        console.log("longitude", location.coords.longitude);
        console.log(data);
        console.log(data.uri);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved!");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendImage = () => {
    if (image) {
      try {
        console.log("navigation", navigation);
        // alert('Picture sended!');
        navigation.navigate("DefaultScreen", { image });
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const flashSwitch = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const flashIconColorChange =
    flash === Camera.Constants.FlashMode.off ? "#FF6C00" : "#f1f1f1";
  const flashIconChange =
    flash === Camera.Constants.FlashMode.on
      ? "ios-flash-sharp"
      : "ios-flash-off-sharp";

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Button
              icon={"ios-camera-reverse-outline"}
              onPress={changeCameraType}
            />
            <Button
              icon={flashIconChange}
              color={flashIconColorChange}
              onPress={flashSwitch}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Button
              title={"Re-take"}
              icon="ios-refresh"
              onPress={() => setImage(null)}
            />
            <Button
              title={"Send"}
              icon="ios-arrow-redo-outline"
              onPress={sendImage}
            />
            <Button
              title={"Save"}
              icon="ios-checkmark-sharp"
              onPress={saveImage}
            />
          </View>
        ) : (
          <Button
            title={"Take a picture"}
            icon="ios-camera"
            onPress={takePicture}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c6c6c6",
  },
  camera: {
    flex: 1,
    // height: 300,
    marginTop: 60,
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
