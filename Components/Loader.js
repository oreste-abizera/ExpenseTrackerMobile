import React from "react";
import { View, Image } from "react-native";

export default function Loader() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/loader1.gif")}></Image>
    </View>
  );
}
