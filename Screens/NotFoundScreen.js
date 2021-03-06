import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Context from "../Context/ContextProvider";

export default function NotFoundScreen() {
  const { changeNavigation } = React.useContext(Context);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40%",
      }}
    >
      <Text>Screen is under development</Text>
      <TouchableOpacity
        style={{
          marginTop: 30,
          backgroundColor: "rgb(32, 137, 220)",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => changeNavigation("Home")}
      >
        <Text style={{ color: "#fff" }}>Go back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
