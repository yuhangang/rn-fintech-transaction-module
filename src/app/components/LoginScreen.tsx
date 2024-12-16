import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { Button, GestureResponderEvent, View } from "react-native";
import { loginUser } from "../../modules/core/store/auth/authActions";

export function LoginScreen(props: {
  onPress: (event: GestureResponderEvent) => void;
}): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 20 }}></View>
      <Button title="Login" onPress={props.onPress} />
    </View>
  );
}
