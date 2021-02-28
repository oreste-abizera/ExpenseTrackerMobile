import React from "react";
import { View, Text } from "react-native";
import AddTransactionTrigger from "../Components/AddTransactionTrigger";
import CategoriesComponent from "../Components/CategoriesComponent";
import ThisMonthInfo from "../Components/ThisMonthInfo";

export default function MainScreen() {
  return (
    <View>
      <ThisMonthInfo></ThisMonthInfo>
      <CategoriesComponent></CategoriesComponent>
      <AddTransactionTrigger></AddTransactionTrigger>
    </View>
  );
}
