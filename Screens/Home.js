import React from "react";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/Feather";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { LogOutIcon } from "../components/LogOutIcon";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "PostsScreen") {
            icon = "grid";
          } else if (route.name === "CreatePostsScreen") {
            icon = "plus";
          } else if (route.name === "ProfileScreen") {
            icon = "user";
          }

          return <Icon name={icon} color={color} size={size} />;
        },
        tabBarStyle: {
          height: 48,
          alignItems: "center",
        },
        tabBarItemStyle: {
          margin: 5,
          borderRadius: 20,
          maxWidth: 70,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgba(255, 255, 255, 1)",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "rgba(255, 108, 0, 1)",
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => <LogOutIcon style={{ paddingRight: 20 }} />,
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          headerBackVisible: true,
          headerLeft: () => (
            <HeaderBackButton
              label="Back"
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          headerBackVisible: true,
          tabBarButton: () => null,
          headerLeft: () => (
            <HeaderBackButton
              label="Back"
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Місцевість",
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          headerBackVisible: true,
          tabBarButton: () => null,
          headerLeft: () => (
            <HeaderBackButton
              label="Back"
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
