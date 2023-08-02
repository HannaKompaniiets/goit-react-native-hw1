import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "../redux/auth-selectors";
import postSelectors from "../redux/post-selectors";
import { getAllPosts } from "../redux/post-operations";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function PostsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  if (!user) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Image
          style={styles.userPhoto}
          source={require("../assets/user-photo.png")}
        ></Image>

        <View style={styles.userName}>
          <Text style={styles.fullName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 16,
  },
  userDetails: {
    marginTop: 16,
    marginBottom: 32,
    height: 60,
    flexDirection: "row",
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    height: 60,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
    color: "rgba(33, 33, 33, 0.8)",
  },
  fullName: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    height: 300,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postName: {
    height: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  postInfo: {
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    color: "rgba(189, 189, 189, 1)",
  },
  commentsAmount: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
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
