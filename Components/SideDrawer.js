import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

export default function SideDrawer() {
  const {
    drawerOpen,
    navigation,
    toggleDrawer,
    user,
    changeNavigation,
    nextDrawerState,
  } = React.useContext(Context);
  let links = [
    { id: 1, title: "Home", path: "Home" },
    { id: 2, title: "All Transactions", path: "Exchanges" },
    { id: 3, title: "Notifications", path: "Notifications" },
    { id: 4, title: "Add Expense and Incomes", path: "Add" },
  ];

  if (user.token) {
    links.push({ id: 7, title: "Logout", path: "Logout" });
  } else {
    links = [
      { id: 5, title: "Login", path: user.token ? navigation : "Login" },
      { id: 6, title: "Register", path: user.token ? navigation : "Register" },
    ];
  }

  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: drawerOpen && nextDrawerState && fadeAnim._value === 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: drawerOpen && !nextDrawerState && fadeAnim._value === 0 ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, nextDrawerState]);

  return (
    <Animated.View
      style={[
        styles.sidebarWrapper,
        {
          transform: [{ translateX: drawerOpen ? 0 : -500 }],
          opacity: fadeAnim,
        },
      ]}
    >
      {links.map((link) => (
        <TouchableOpacity
          style={styles.link}
          key={link.id}
          onPress={() => {
            toggleDrawer();
            changeNavigation(
              user.token || link.path === "Register" ? link.path : "Login"
            );
          }}
        >
          <Text>{link.title}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

const styles = EStyleSheet.create({
  sidebarWrapper: {
    position: "absolute",
    top: 65,
    left: 0,
    width: "65%",
    height: "40%",
    padding: "1.5rem",
    backgroundColor: "#fff",
    zIndex: 4,
    borderRightColor: "rgb(32, 137, 220)",
    borderBottomColor: "rgb(32, 137, 220)",
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },

  link: {
    fontSize: "1.5rem",
    textTransform: "capitalize",
    paddingVertical: "0.5rem",
    paddingHorizontal: "1.5rem",
    backgroundColor: "transparent",
  },
});
