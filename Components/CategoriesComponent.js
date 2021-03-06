import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";
import SingleCategory from "./SingleCategory";

export default function CategoriesComponent() {
  const colors = ["#e5fcde", "#bbe4d7", "#c0efc5", "f9dede", "#ba7930"];
  const { categories = [] } = React.useContext(Context);
  const [showAll, setshowAll] = React.useState(false);

  const handleShowAll = () => {
    setshowAll(!showAll);
  };
  let showCategories = showAll ? categories : categories.slice(0, 4);
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesHeading}>
        Categories: {categories.length}
      </Text>
      {showCategories.map((category) => (
        <SingleCategory
          key={category._id}
          category={category}
          styles={styles}
        ></SingleCategory>
      ))}

      {categories.length > 4 && (
        <TouchableOpacity
          style={{ marginLeft: 200, marginVertical: 10 }}
          onPress={handleShowAll}
        >
          <Text>{showAll ? "Show less" : "Show All"}</Text>
        </TouchableOpacity>
      )}
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
