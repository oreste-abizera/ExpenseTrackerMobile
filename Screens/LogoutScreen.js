import React from "react";
import { View } from "react-native";
import Context from "../Context/ContextProvider";

export default function LogoutScreen() {
  const { logout } = React.useContext(Context);
  React.useEffect(() => {
    logout();
  }, []);
  return <View></View>;
}
