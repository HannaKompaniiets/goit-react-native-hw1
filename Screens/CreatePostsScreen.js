import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/post-operations";
import * as Location from "expo-location";

export default function CreatePostsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [postName, setPostName] = useState();
  const [postLocation, setPostLocation] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let createPostEnabled = postName && postLocation;

  const createPost = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    const post = {
      postLocation,
      coords,
      imageUri,
      name: postName,
    };

    dispatch(addPost(post));
    navigation.navigate("PostsScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.postImageContainer}>
          <View style={styles.postImage}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.flipContainer}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    {" "}
                    Flip{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                      setImageUri(uri);
                    }
                  }}
                >
                  <View style={styles.takePhotoOut}>
                    <View style={styles.takePhotoInner}></View>
                    <Icon
                      style={styles.takePhotoInner}
                      name="camera"
                      size={24}
                      color="rgba(189, 189, 189, 1)"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          <Text style={styles.postImageText}>Завантажте фото</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.inputView}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.postName}
            placeholder="Назва..."
            placeholderTextColor="rgba(189, 189, 189, 1)"
            value={postName}
            onChangeText={setPostName}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={styles.inputView}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Icon
            style={styles.locationIcon}
            name="map-pin"
            size={24}
            color="rgba(189, 189, 189, 1)"
          />
          <TextInput
            style={styles.postLocation}
            placeholder="Місцевість..."
            placeholderTextColor="rgba(189, 189, 189, 1)"
            value={postLocation}
            onChangeText={setPostLocation}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={[
            styles.createPostBtn,
            createPostEnabled ? styles.btnEnabled : styles.btnDisabled,
          ]}
          onPress={createPost}
        >
          <Text
            style={[
              styles.createPostBtnTitle,
              createPostEnabled
                ? styles.btnEnabledText
                : styles.btnDisabledText,
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>

        <View style={styles.deletePostBtn}>
          <TouchableOpacity style={styles.deleteBtnWrapper}>
            <Icon
              style={styles.deleteBtn}
              name="trash-2"
              size={24}
              color="rgba(189, 189, 189, 1)"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  postImageContainer: {
    marginTop: 16,
    marginBottom: 16,
    height: 268,
  },
  postImage: {
    backgroundColor: "grey",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
  },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },
  button: { alignSelf: "center" },
  takePhotoOut: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  postImageText: {
    marginTop: 8,
    height: 20,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "rgba(189, 189, 189, 1)",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
    height: 50,
    marginTop: 16,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  locationIcon: {
    marginRight: 8,
  },
  createPostBtn: {
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  btnEnabled: {
    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  btnDisabled: {
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  createPostBtnTitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
  },
  btnEnabledText: {
    color: "rgba(255, 255, 255, 1)",
  },
  btnDisabledText: {
    color: "rgba(189, 189, 189, 1)",
  },
  deletePostBtn: {
    height: 48,
    width: screenWidth,
    position: "absolute",
    bottom: 16,
    alignItems: "center",
  },
  deleteBtnWrapper: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(246, 246, 246, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
