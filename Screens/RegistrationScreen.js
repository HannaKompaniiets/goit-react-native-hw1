import React, { useState } from "react";
import { register } from "../redux/auth-operations";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authStateChanged } from "../firebase-auth";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
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
    dispatch(
      register({ credentials: { email, password }, displayName: login })
    );
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
              <View style={styles.userImage}>
                <Image
                  style={styles.addPhotoIcon}
                  source={require("../assets/add-photo.png")}
                />
              </View>

              <View>
                <Text style={styles.registrationText}>Реєстрація</Text>
              </View>

              <TextInput
                style={styles.inputView}
                placeholder="Логін"
                value={login}
                onChangeText={setLogin}
              />
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

              <TouchableOpacity style={styles.registerBtn} onPress={submitForm}>
                <Text style={styles.registerBtnTitle}>Зареєстуватися</Text>
              </TouchableOpacity>
              <View style={styles.loginLink}>
                <Text style={styles.loginLinkText}>Вже є акаунт? </Text>
                <Text
                  style={styles.loginLinkText}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  Увійти
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
  userImage: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    alignSelf: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 16,
  },
  addPhotoIcon: {
    position: "absolute",
    top: 80,
    left: 105,
  },
  registrationText: {
    paddingTop: 32,
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
  registerBtn: {
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  registerBtnTitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 1)",
  },
  loginLink: {
    flexDirection: "row",
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  loginLinkText: {
    color: "rgba(27, 67, 113, 1)",
  },
});
