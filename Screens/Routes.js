import React, { useContext } from "react";
import { View } from "react-native";
import Context from "../Context/ContextProvider";
import AddTransactionScreen from "./AddTransactionScreen";
import ExchangesScreen from "./ExchangesScreen";
import LoginScreen from "./LoginScreen";
import LogoutScreen from "./LogoutScreen";
import MainScreen from "./MainScreen";
import NotFoundScreen from "./NotFoundScreen";
import NotificationsScreen from "./NotificationsScreen";

export default function Routes() {
  const { navigation, user, changeNavigation } = useContext(Context);
  React.useEffect(() => {
    if (!user.token && navigation !== "Login") {
      changeNavigation("Login");
    }
  }, [user.token, navigation]);

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
      ) : navigation === "Login" ? (
        <LoginScreen></LoginScreen>
      ) : navigation === "Logout" ? (
        <LogoutScreen></LogoutScreen>
      ) : (
        <NotFoundScreen></NotFoundScreen>
      )}
    </View>
  );
}
