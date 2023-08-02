import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logIn } from "../redux/auth-operations";
import { useDispatch } from "react-redux";
import { authStateChanged } from "../firebase-auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const bgImage = require("../assets/photo-bg.png");

  authStateChanged((user) => {
    if (user) {
      navigation.navigate("Home");
    }
  });

  const submitForm = () => {
    dispatch(logIn({ email, password }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -200 })}
            style={styles.keyboardContainer}
          >
            <View style={styles.formBackground}>
              <View>
                <Text style={styles.loginHeader}>Увійти</Text>
              </View>

              <TextInput
                style={styles.inputView}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.passInputView}>
                <TextInput
                  style={styles.inputView}
                  secureTextEntry={hidePass}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={styles.showPassBtn}
                  onPress={() => setHidePass(!hidePass)}
                >
                  <Text style={styles.showPassBtnText}>
                    {hidePass ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
                <Text style={styles.loginBtnTitle}>Увійти</Text>
              </TouchableOpacity>
              <View style={styles.registerLink}>
                <Text style={styles.registerLinkText}>Немає акаунту? </Text>
                <Text
                  style={styles.registerLinkText}
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  Зареєструватися
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formBackground: {
    height: 550,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
  },
  loginHeader: {
    paddingTop: 32,
    paddingBottom: 36,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  inputView: {
    justifyContent: "center",
    paddingLeft: 16,
    marginTop: 12,
    height: 50,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
  },
  passInputView: {
    position: "relative",
    justifyContent: "center",
  },
  showPassBtn: {
    position: "absolute",
    top: 25,
    right: 16,
  },
  showPassBtnText: {
    color: "rgba(27, 67, 113, 1)",
  },
  loginBtn: {
    marginTop: 48,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  loginBtnTitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 1)",
  },
  registerLink: {
    flexDirection: "row",
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  registerLinkText: {
    color: "rgba(27, 67, 113, 1)",
  },
});
