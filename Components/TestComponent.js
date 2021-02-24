import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

// define extended styles
const styles = EStyleSheet.create({
  column: {
    width: "80%", // 80% of screen width
  },
  text: {
    color: "$textColor", // global variable $textColor
    fontSize: "1.5rem", // relative REM unit
  },
  "@media (min-width: 350) and (max-width: 500)": {
    // media queries
    text: {
      fontSize: "2rem",
    },
  },
});

// use styles as usual
class TestComponent extends React.Component {
  render() {
    return (
      <View style={styles.column}>
        <Text style={styles.text}>Hello</Text>
      </View>
    );
  }
}

export default TestComponent;
