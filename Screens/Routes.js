import React, { useContext } from "react";
import { View } from "react-native";
import Context from "../Context/ContextProvider";
import MainScreen from "./MainScreen";
import NotFoundScreen from "./NotFoundScreen";
import NotificationsScreen from "./NotificationsScreen";

export default function Routes() {
  const { navigation } = useContext(Context);
  return (
    <View>
      {navigation === "Home" ? (
        <MainScreen></MainScreen>
      ) : navigation === "Notifications" ? (
        <NotificationsScreen></NotificationsScreen>
      ) : (
        <NotFoundScreen></NotFoundScreen>
      )}
    </View>
  );
}
