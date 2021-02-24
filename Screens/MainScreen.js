import React from "react";
import { useContext } from "react";
import { View, Text } from "react-native";
import ThisMonthInfo from "../Components/ThisMonthInfo";
import Context from "../Context/ContextProvider";

export default function MainScreen() {
  const { navigation, changeNavigation } = useContext(Context);

  React.useEffect(() => {
    changeNavigation("Home");
  }, [navigation]);
  console.log("Main Screen mounted.");
  return (
    <View>
      <ThisMonthInfo></ThisMonthInfo>
    </View>
  );
}
