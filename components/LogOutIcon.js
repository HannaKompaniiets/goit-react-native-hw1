import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth-operations";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export const LogOutIcon = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.logOutBtn} onPress={() => {
      dispatch(logOut());
      navigation.navigate("LoginScreen");
    }}>
      <Icon name="log-out" color="rgba(189, 189, 189, 1)" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    position: "absolute",
    top: 24,
    right: 16,
    color: "rgba(189, 189, 189, 1)",
  },
});
