import React from "react";
import { View } from "react-native";
import Context from "../Context/ContextProvider";

export default function Overlay() {
  const { drawerOpen, toggleDrawer } = React.useContext(Context);
  const overlayStyles = drawerOpen
    ? {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
    : {};
  return <View onTouchEnd={toggleDrawer} style={overlayStyles}></View>;
}
