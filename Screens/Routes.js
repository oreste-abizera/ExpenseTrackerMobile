import React, { useContext } from "react";
import { View } from "react-native";
import SideDrawer from "../Components/SideDrawer";
import Context from "../Context/ContextProvider";
import AddTransactionScreen from "./AddTransactionScreen";
import ExchangesScreen from "./ExchangesScreen";
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
      ) : navigation === "Exchanges" ? (
        <ExchangesScreen></ExchangesScreen>
      ) : navigation === "Add" ? (
        <AddTransactionScreen></AddTransactionScreen>
      ) : (
        <NotFoundScreen></NotFoundScreen>
      )}
    </View>
  );
}
