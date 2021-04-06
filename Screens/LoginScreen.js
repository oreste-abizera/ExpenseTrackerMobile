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
import Context from "../Context/ContextProvider";
import url from "../utils/url";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit, errors } = useForm();
  const { loginUser, changeNavigation, user } = React.useContext(Context);
  const identifierInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const [sending, setsending] = React.useState(false);

  const onSubmit = async (data) => {
    setsending(true);
    let response;
    await axios
      .post(`${url}/api/users/login`, data)
      .then((res) => (response = res.data))
      .catch((err) => {
        if (err.response) {
          response = err.response.data;
        } else {
          response = null;
        }
      });

    if (!response) {
      Alert.alert("Error occured");
    } else if (response.success) {
      if (loginUser(response)) {
        changeNavigation("Home");
      }
    } else {
      Alert.alert(
        "Error",
        response.error || response.message || "Invalid credentials"
      );
    }
    setsending(false);
  };

  React.useEffect(() => {
    if (user.token) {
      changeNavigation("Home");
    }
  }, [user]);

  let errorIdentifierField = errors.identifier ? styles.errorLabel : {};
  let errorPasswordField = errors.password ? styles.errorLabel : {};
  return (
    <View style={[styles.container]}>
      <View style={styles.form}>
        <Text style={styles.title}>Login here</Text>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Email or phone number</Text>
          <Controller
            defaultValue=""
            name="identifier"
            control={control}
            onFocus={() => identifierInputRef.current.focus()}
            rules={{ required: "This field is required." }}
            render={(props) => (
              <TextInput
                {...props}
                style={[styles.formControl, errorIdentifierField]}
                onChangeText={(text) => props.onChange(text)}
                ref={identifierInputRef}
              ></TextInput>
            )}
          ></Controller>
          {errors.identifier && (
            <Text style={styles.error}>Enter email or phone number</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{ required: "This is required." }}
            onFocus={() => passwordInputRef.current.focus()}
            render={(props) => (
              <TextInput
                {...props}
                secureTextEntry={true}
                style={[styles.formControl, errorPasswordField]}
                onChangeText={(text) => props.onChange(text)}
                ref={passwordInputRef}
              ></TextInput>
            )}
          ></Controller>
          {errors.password && <Text style={styles.error}>Enter password</Text>}
        </View>

        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "#fff" }}>{sending ? "Wait..." : "Login"}</Text>
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
  title: {
    fontSize: 21,
    marginBottom: "1.5rem",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  form: {
    // backgroundColor: "green",
    width: "80%",
    padding: "2rem",
    marginTop: "30%",
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
  errorLabel: {
    borderColor: "#c51244",
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
  error: {
    color: "#c51244",
  },
});
