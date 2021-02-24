import { StyleSheet, View } from "react-native";
import EstyleSheet from "react-native-extended-stylesheet";
import { Icon, Badge } from "react-native-elements";
import React, { useState } from "react";

export default function FooterComponent() {
  const [active, setactive] = useState(1);
  const iconsData = [
    {
      id: 1,
      name: "home",
      type: "font-awesome",
    },
    {
      id: 2,
      name: "exchange",
      type: "font-awesome",
    },
    {
      id: 3,
      name: "bell-o",
      type: "font-awesome",
      notifications: 10,
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
        <View style={{ position: "relative" }} key={iconData.id}>
          <Icon
            style={
              iconData.id === active
                ? [styles.icon, styles.iconActive]
                : styles.icon
            }
            {...iconData}
            color={iconData.id === active ? "rgb(32, 137, 220)" : "#000000"}
            onPress={() => setactive(iconData.id)}
          ></Icon>
          {iconData.notifications > 0 && (
            <Badge
              containerStyle={styles.badge}
              value="9+"
              status="error"
            ></Badge>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: "60px",
    textAlign: "center",
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  icon: {
    width: "1.5rem",
    height: "90%",
    borderRadius: "50%",
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
  },
  iconActive: {
    width: "2.5rem",
    // backgroundColor: "rgb(32, 137, 220)",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
  },
});
