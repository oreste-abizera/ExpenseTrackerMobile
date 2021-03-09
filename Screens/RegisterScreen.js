import axios from "axios";
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
import Toast from "react-native-simple-toast";
import Context from "../Context/ContextProvider";
import url from "../utils/url";

export default function LoginScreen() {
  const { loginUser, changeNavigation, user } = React.useContext(Context);
  const [names, setnames] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState();

  const height = Dimensions.get("window").height;
  const handleNames = (value) => {
    setnames(value);
  };
  const handlePassword = (value) => {
    setpassword(value);
  };
  const handleemail = (value) => {
    setemail(value);
  };
  const handlephone = (value) => {
    setphone(value);
  };

  const handleSubmit = async () => {
    const dataToSend = {
      names,
      password,
    };
    if (!email && !phone) {
      Toast.show("Fill Email or Phone number", Toast.LONG);
      return;
    }
    if (email) dataToSend.email = email;
    if (phone) dataToSend.phone = phone;
    if (!password || !names) {
      Toast.show("Check all fields", Toast.LONG);
      return;
    }
    let response;
    await axios
      .post(`${url}/api/users/register`, dataToSend)
      .then((res) => (response = res.data))
      .catch((err) => (response = err.response.data));

    if (response.success) {
      if (loginUser(response)) {
        changeNavigation("Home");
      }
    } else {
      console.log(response);
      Toast.show("Error occured", Toast.LONG);
    }
  };

  React.useEffect(() => {
    if (user.token) {
      changeNavigation("Home");
    }
  }, [user]);
  return (
    <View style={[styles.container]}>
      {/* <Text>Register here</Text> */}
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Names</Text>
          <TextInput
            placeholder=""
            style={styles.formControl}
            value={names}
            onChangeText={(text) => handleNames(text)}
          ></TextInput>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder=""
            style={styles.formControl}
            value={email}
            onChangeText={(text) => handleemail(text)}
          ></TextInput>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            placeholder=""
            style={styles.formControl}
            value={phone}
            onChangeText={(text) => handlephone(text)}
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
          <Text style={{ color: "#fff" }}>Register</Text>
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
    marginTop: "10%",
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
