import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import postSelectors from "../redux/post-selectors";
import { getPost, addComment } from "../redux/post-operations";
import { nanoid } from "nanoid";

export default function CommentsScreen() {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const {
    params: { postId, userId },
  } = useRoute();

  useEffect(() => {
    dispatch(getPost({ id: postId }));
  }, [dispatch]);

  const post = useSelector(postSelectors.getActivePost);
  if (!post) {
    return <View/>
  }

  const addNewComment = () => {
    const comment = {
      id: nanoid(),
      authorId: userId,
      message: newComment,
      creationDate: new Date().toString()
    }
    dispatch(addComment({ comment, id: postId }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.postImage}
          source={require("../assets/user-photo.png")}
        ></Image>

        <SafeAreaView style={styles.commentsContainer}>
          <FlatList
            data={post.data.comments}
            renderItem={({ item }) => {
              const isPostOwnerComment = item.authorId === userId;
              return (
                <View
                  style={[
                    styles.commentWrapper,
                    {
                      flexDirection: isPostOwnerComment ? "row-reverse" : "row",
                    },
                  ]}
                >
                  <Image
                    style={styles.commentAuthor}
                    source={require("../assets/user-photo.png")}
                  ></Image>

                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{item.message}</Text>
                    <Text
                      style={[
                        styles.commentCreationDate,
                        {
                          alignSelf: isPostOwnerComment
                            ? "flex-start"
                            : "flex-end",
                        },
                      ]}
                    >
                      {item.creationDate}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <View style={styles.commentInputView}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              value={newComment}
              onChangeText={setNewComment}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={styles.createCommentBtn}
            onPress={addNewComment}
          >
            <Icon name="arrow-up" style={styles.createCommentIcon} size={20}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 16,
  },
  commentsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  commentWrapper: {
    gap: 16,
    paddingBottom: 16,
    borderRadius: 6,
  },
  commentAuthor: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentContent: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    flexGrow: 1,
  },
  commentText: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33, 33, 33, 1)",
    paddingBottom: 8,
  },
  commentCreationDate: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 12,
    color: "rgba(189, 189, 189, 1)",
  },
  commentInputView: {
    height: 50,
    marginTop: 16,
    marginBottom: 16,
    position: "relative",
    justifyContent: "center",
  },
  commentInput: {
    justifyContent: "center",
    paddingLeft: 16,
    marginTop: 12,
    height: 50,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
  },
  createCommentBtn: {
    position: "absolute",
    top: 15,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  createCommentIcon: {
    color: "rgba(255, 255, 255, 1)",
  },
});
