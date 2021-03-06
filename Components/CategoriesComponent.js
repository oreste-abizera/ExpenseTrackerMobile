import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";
import SingleCategory from "./SingleCategory";

export default function CategoriesComponent() {
  const colors = ["#e5fcde", "#bbe4d7", "#c0efc5", "f9dede", "#ba7930"];
  const { categories = [] } = React.useContext(Context);
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesHeading}>
        Categories: {categories.length}
      </Text>
      {categories.slice(0, 4).map((category) => (
        <SingleCategory
          key={category._id}
          category={category}
          styles={styles}
        ></SingleCategory>
      ))}
    </View>
  );
}

const styles = EStyleSheet.create({
  categories: {
    marginTop: "1rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "#ffffff",
  },
  categoriesHeading: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginVertical: "0.5rem",
  },
  category: {
    marginVertical: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#e5fcde",
    padding: "0.5rem",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
