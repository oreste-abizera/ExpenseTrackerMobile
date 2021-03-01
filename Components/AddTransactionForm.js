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
import RadioButton from "./RadioButton";

const AddTransactionForm = () => {
  const { categories = [] } = React.useContext(Context);
  const [amount, setamount] = React.useState();
  const [mode, setmode] = React.useState();
  const [category, setcategory] = React.useState();
  const [note, setnote] = React.useState("");
  const [type, settype] = React.useState("Expense");
  const [values, setvalues] = React.useState({
    amount: 0,
    mode: "",
    category: "",
    note: "",
    type: "",
  });

  const changeType = (newValue) => {
    settype(newValue);
  };
  const handleamount = (newValue) => {
    setamount(newValue);
  };

  const handlemode = (newValue) => {
    setmode(newValue);
  };

  const handlecategory = (newValue) => {
    setcategory(newValue);
  };

  const handlenote = (newValue) => {
    setnote(newValue);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>Add Transaction</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text onPress={() => changeType("Expense")}>
            <RadioButton selected={type === "Expense"}></RadioButton>
          </Text>
          <Text style={{ marginLeft: 5 }} onPress={() => changeType("Expense")}>
            Expense
          </Text>
        </View>
        <View
          style={{
            marginLeft: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text onPress={() => changeType("Income")}>
            <RadioButton selected={type === "Income"}></RadioButton>
          </Text>
          <Text style={{ marginLeft: 5 }} onPress={() => changeType("Income")}>
            Income
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          placeholder="e.g: 5000"
          style={styles.formControl}
          value={amount}
          onChangeText={(text) => handleamount(text)}
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
          <Picker
            selectedValue={mode}
            onValueChange={(value, index) => {
              handlemode(value);
            }}
          >
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
          <Picker
            selectedValue={category}
            onValueChange={(value, index) => {
              handlecategory(value);
            }}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((cat) => (
              <Picker.Item
                label={cat.title}
                value={cat._id}
                key={cat._id}
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
          value={note}
          onChangeText={(text) => handlenote(text)}
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