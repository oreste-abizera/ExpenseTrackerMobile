import React from "react";
import { View } from "react-native";

function RadioButton(props) {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: props.selected ? "rgb(32, 137, 220)" : "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "rgb(32, 137, 220)",
          }}
        />
      ) : null}
    </View>
  );
}

export default RadioButton;
