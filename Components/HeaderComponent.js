import React from "react";
import { Header } from "react-native-elements";

export default function HeaderComponent() {
  return (
    <Header
      placement="left"
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "Expense Tracker", style: { color: "#fff" } }}
      //   rightComponent={{ icon: "home", color: "#fff" }}
    />
  );
}
