import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Picker,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
// import Picker from "@react-native-community/picker";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

const AddTransactionForm = () => {
  const { categories = [] } = React.useContext(Context);
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>Add Transaction</Text>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          placeholder="e.g: 5000"
          style={styles.formControl}
        ></TextInput>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Mode</Text>
        {/* <Picker
          selectedValue={""}
          style={styles.formControl}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select mode" value="" />
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Bank" value="Bank" />
        </Picker> */}
        <View
          style={[
            styles.formControl,
            { display: "flex", justifyContent: "center" },
          ]}
        >
          <Picker selectedValue="Cash">
            <Picker.Item label="Select mode" value="" />
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Bank" value="Bank" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Category</Text>
        <View
          style={[
            styles.formControl,
            { display: "flex", justifyContent: "center" },
          ]}
        >
          <Picker selectedValue="Cash">
            <Picker.Item label="Select Category" value="" />
            {categories.map((category) => (
              <Picker.Item
                label={category.title}
                value={category._id}
                key={category._id}
              ></Picker.Item>
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Note</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Note"
          style={styles.formControl}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.submit}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: "1rem",
  },
  formLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: "1rem",
  },
  inputLabel: {
    fontSize: 20,
  },
  formControl: {
    borderColor: "white",
    marginTop: 10,
    width: 400,
    minHeight: 40,
    paddingHorizontal: 10,
    // borderRadius: 50,
    backgroundColor: "#DCDCDC",
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  formGroup: {
    marginVertical: "0.5rem",
  },
  submit: {
    marginTop: "2rem",
    marginLeft: "20%",
    width: "45%",
    backgroundColor: "rgb(32, 137, 220)",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.8rem",
  },
});

export default AddTransactionForm;
