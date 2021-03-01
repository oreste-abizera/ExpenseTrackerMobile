import React from "react";
import { Header, Icon } from "react-native-elements";

const LeftComponent = () => {
  let previous = "";
  return (
    <Icon
      name={previous ? "bars" : "arrow-left"}
      type="font-awesome"
      color="#fff"
      size={19}
      onPress={() => alert("Pressed back icon")}
    ></Icon>
  );
};

export default function HeaderComponent() {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent></LeftComponent>}
      centerComponent={{ text: "Expense Tracker", style: { color: "#fff" } }}
      //   rightComponent={{ icon: "home", color: "#fff" }}
      on
    />
  );
}
