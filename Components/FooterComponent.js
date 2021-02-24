import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon, Badge } from "react-native-elements";
import React from "react";
import Context from "../Context/ContextProvider";
import { useContext } from "react";

const styles = EStyleSheet.create({
  footer: {
    width: "100%",
    height: "4rem",
    textAlign: "center",
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    borderTopRightRadius: "1rem",
    borderTopLeftRadius: "1rem",
  },
  icon: {
    width: "1.5rem",
    height: "90%",
    borderRadius: 50,
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
  },
  iconActive: {
    width: "2.5rem",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
  },
});

export default function FooterComponent() {
  const { navigation, changeNavigation } = useContext(Context);
  console.log("Footer mounted.", navigation);

  const iconsData = [
    {
      id: 1,
      name: "home",
      type: "font-awesome",
      component: "Home",
    },
    {
      id: 2,
      name: "exchange",
      type: "font-awesome",
      component: "Exchange",
    },
    {
      id: 3,
      name: "bell-o",
      type: "font-awesome",
      notifications: 10,
      component: "Notifications",
    },
    {
      id: 4,
      name: "plus",
      type: "font-awesome",
      component: "Add",
    },
  ];
  return (
    <View style={styles.footer}>
      {iconsData.map((iconData) => (
        <View style={{ position: "relative" }} key={iconData.id}>
          <Icon
            style={
              navigation === iconData.component
                ? [styles.icon, styles.iconActive]
                : styles.icon
            }
            {...iconData}
            color={
              navigation === iconData.component
                ? "rgb(32, 137, 220)"
                : "#000000"
            }
            onPress={() => changeNavigation(iconData.component)}
          ></Icon>
          {iconData.notifications > 0 && (
            <Badge
              onPress={() => changeNavigation(iconData.component)}
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
