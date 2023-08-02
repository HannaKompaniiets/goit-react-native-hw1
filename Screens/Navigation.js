import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import authSelectors from "../redux/auth-selectors";
import { useSelector } from "react-redux";

export default function Navigation() {
  const MainStack = createStackNavigator();
  const userLoggeIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <NavigationContainer style={styles.container}>
      <MainStack.Navigator
        initialRouteName={userLoggeIn ? "Home" : "LoginScreen"}
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
