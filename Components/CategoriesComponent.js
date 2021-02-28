import React from "react";
import { View, Text } from "react-native";
import Context from "../Context/ContextProvider";

export default function CategoriesComponent() {
  const { categories = [] } = React.useContext(Context);
  return (
    <View>
      <Text> Categories: {categories.length}</Text>
    </View>
  );
}
