import axios from "axios";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";
import url from "../utils/url";
import RadioButton from "./RadioButton";
import Toast from "react-native-simple-toast";

const AddTransactionForm = () => {
  const {
    categories = [],
    user,
    changeNavigation,
    reload,
    add,
  } = React.useContext(Context);
  const [amount, setamount] = React.useState();
  const [mode, setmode] = React.useState();
  const [category, setcategory] = React.useState();
  const [note, setnote] = React.useState("");
  const [type, settype] = React.useState(add);
  const [errors, seterrors] = React.useState({
    amount: null,
    category: null,
    note: null,
    type: null,
    mode: null,
  });
  const [sending, setsending] = React.useState(false);

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

  const handleSubmit = async () => {
    setsending(true);
    const dataToSend = {
      amount,
      type,
      category,
      mode,
      note,
    };
    let response;
    await axios
      .post(`${url}/api/transactions`, dataToSend, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => (response = res.data))
      .catch((err) => (response = err?.response?.data));

    if (!response) {
      setsending(false);
      Toast.show("Error occured", Toast.LONG);
      return;
    }
    if (response.success) {
      reload();
      changeNavigation("Home");
    } else {
      Toast.show("Check all inputs", Toast.LONG);
    }
    setsending(false);
  };
  const errorControl = [styles.formControl, styles.formControlError];
  const errorLabel = [styles.inputLabel, styles.errorInputLabel];

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
          <Text onPress={() => changeType("expense")}>
            <RadioButton selected={type === "expense"}></RadioButton>
          </Text>
          <Text style={{ marginLeft: 5 }} onPress={() => changeType("expense")}>
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
          <Text onPress={() => changeType("income")}>
            <RadioButton selected={type === "income"}></RadioButton>
          </Text>
          <Text style={{ marginLeft: 5 }} onPress={() => changeType("income")}>
            Income
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={errors.amount ? errorLabel : styles.inputLabel}>
          Amount
        </Text>
        <TextInput
          placeholder="e.g: 5000"
          style={errors.amount ? errorControl : styles.formControl}
          value={amount}
          onChangeText={(text) => handleamount(text)}
        ></TextInput>
        {errors.amount && (
          <Text style={[errorLabel, { fontSize: 18, marginTop: 3 }]}>
            {errors.amount}
          </Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Mode</Text>
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
          style={errors.note ? errorControl : styles.formControl}
          value={note}
          onChangeText={(text) => handlenote(text)}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.submit}
        onPress={handleSubmit}
        disabled={sending}
      >
        <Text style={{ color: "#fff" }}>{sending ? "Wait..." : "Save"}</Text>
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
  errorInputLabel: {
    color: "red",
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
  formControlError: {
    borderColor: "#c89494",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#F9D3D3",
  },
  formGroup: {
    marginVertical: "0.5rem",
  },
  submit: {
    marginVertical: "1rem",
    marginLeft: "30%",
    width: "30%",
    backgroundColor: "rgb(32, 137, 220)",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.8rem",
  },
});

export default AddTransactionForm;
