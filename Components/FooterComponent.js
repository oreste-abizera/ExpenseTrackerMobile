import { Text, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

export default function FooterComponent() {
  const iconsData = [
    {
      id: 1,
      name: "home",
    },
    {
      id: 2,
      name: "g-translate",
    },
    {
      id: 3,
      name: "rowing",
    },
    {
      id: 4,
      name: "plus",
      type: "font-awesome",
    },
  ];
  return (
    <View style={styles.footer}>
      {iconsData.map((iconData) => (
        <Icon
          style={styles.icon}
          {...iconData}
          key={iconData.id}
          color="#ffffff"
        ></Icon>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: "40px",
    textAlign: "center",
    backgroundColor: "rgb(32, 137, 220)",
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "1.5rem",
  },
  icon: {
    maxWidth: "1.5rem",
    height: "80%",
  },
});
