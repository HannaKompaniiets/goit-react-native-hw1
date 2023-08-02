import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { LogOutIcon } from "../components/LogOutIcon";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "../redux/auth-selectors";
import postSelectors from "../redux/post-selectors";
import { getAllPosts } from "../redux/post-operations";


export default function ProfileScreen() {
  const navigation = useNavigation();
  const bgImage = require("../assets/photo-bg.png");
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getCurrentUser);
  const posts = useSelector(postSelectors.getPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const openComments = (item) => {
    navigation.navigate("CommentsScreen", {
      postId: item.id,
      userId: user.id,
    });
  };

  const openMap = (item) => {
    navigation.navigate("MapScreen", {
      coords: item.data.coords,
      postLocation: item.data.postLocation,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.formBackground}>
          <View style={styles.userImageContainer}>
            <Image
              style={styles.userImage}
              source={require("../assets/user-photo.png")}
              resizeMode="cover"
            ></Image>
            <Image
              style={styles.addPhotoIcon}
              source={require("../assets/add-photo.png")}
            />
          </View>

          <LogOutIcon style={styles.logOutBtn} />

          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
          </View>

          <SafeAreaView style={styles.postsContainer}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <Image
                    style={styles.postImage}
                    source={require("../assets/post-img.png")}
                  ></Image>
                  <Text style={styles.postName}>{item.data.name}</Text>
                  <View style={styles.postInfo}>
                    <View style={styles.postReactions}>
                      <TouchableOpacity onPress={() => openComments(item)}>
                        <View style={styles.commentsView}>
                          <Icon
                            name="message-circle"
                            style={styles.comments}
                            size={20}
                          ></Icon>
                          <Text style={styles.commentsAmount}>
                            {item.data.comments.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.likesView}>
                        <Icon
                          name="thumbs-up"
                          style={styles.likes}
                          size={20}
                        ></Icon>
                        <Text style={styles.likesAmount}>
                          {item.data.likesAmount}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => openMap(item)}>
                      <View style={styles.locationView}>
                        <Icon
                          name="map-pin"
                          style={styles.mapDetails}
                          size={20}
                        ></Icon>
                        <Text style={styles.locationName}>
                          {item.data.postLocation}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  formBackground: {
    flex: 1,
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
  },
  userImageContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    alignSelf: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 16,
  },
  userImage: {
    width: 120,
    height: 120,
  },
  addPhotoIcon: {
    position: "absolute",
    top: 80,
    left: 105,
  },
  userName: {
    paddingTop: 32,
    paddingBottom: 16,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    height: 300,
    marginBottom: 16,
    marginTop: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
  },
  postName: {
    height: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  postInfo: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postReactions: {
    flexDirection: "row",
  },
  commentsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    color: "rgba(255, 108, 0, 1)",
  },
  commentsAmount: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "rgba(33, 33, 33, 1)",
    marginLeft: 4,
  },
  likesView: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    marginLeft: 24,
    color: "rgba(255, 108, 0, 1)",
  },
  likesAmount: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "rgba(33, 33, 33, 1)",
    marginLeft: 4,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapDetails: {
    color: "rgba(189, 189, 189, 1)",
  },
  locationName: {
    color: "rgba(33, 33, 33, 1)",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});
