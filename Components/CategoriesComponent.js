import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

export default function CategoriesComponent() {
  const colors = ["#e5fcde", "#bbe4d7", "#c0efc5", "f9dede", "#ba7930"];
  const { categories = [] } = React.useContext(Context);
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesHeading}>
        Categories: {categories.length}
      </Text>
      {categories.slice(0, 4).map((category) => (
        <View style={styles.category} key={category._id}>
          <View style={styles.iconContainer}>
            <Icon
              name={category.icon}
              color={category.color}
              type="font-awesome"
            ></Icon>
          </View>

          <View>
            <Text>{category.title}</Text>
            <Text>10 transactions</Text>
          </View>

          <Text>-5000Rwf</Text>
        </View>
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
