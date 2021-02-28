import React from "react";
import { View, Text } from "react-native";
import CategoriesComponent from "../Components/CategoriesComponent";
import ThisMonthInfo from "../Components/ThisMonthInfo";

export default function MainScreen() {
  return (
    <View>
      <ThisMonthInfo></ThisMonthInfo>
      <CategoriesComponent></CategoriesComponent>
    </View>
  );
}
