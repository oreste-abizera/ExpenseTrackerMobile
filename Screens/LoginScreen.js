import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default function LoginScreen() {
  const [identifier, setidentifier] = React.useState("");
  const [password, setpassword] = React.useState("");

  const height = Dimensions.get("window").height;
  const handleIdentifier = (value) => {
    setidentifier(value);
  };
  const handlePassword = (value) => {
    setpassword(value);
  };

  const handleSubmit = () => {
    alert("Login pressed: " + identifier + " pass: " + password);
  };
  return (
    <View style={[styles.container, { minHeight: height }]}>
      {/* <Text>Login here</Text> */}
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Email or phone number</Text>
          <TextInput
            placeholder=""
            style={styles.formControl}
            value={identifier}
            onChangeText={(text) => handleIdentifier(text)}
          ></TextInput>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder=""
            style={styles.formControl}
            value={password}
            onChangeText={(text) => handlePassword(text)}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={{ color: "#fff" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    // backgroundColor: "green",
    width: "80%",
    padding: "2rem",
    marginTop: "-40%",
  },
  formGroup: {
    marginVertical: "1rem",
  },
  formControl: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: "0.5rem",
    height: "2.5rem",
    marginTop: "0.5rem",
    borderColor: "gray",
    borderWidth: "0.15rem",
  },
  submit: {
    marginVertical: "1.5rem",
    marginLeft: "30%",
    width: "40%",
    backgroundColor: "rgb(32, 137, 220)",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.8rem",
  },
});
