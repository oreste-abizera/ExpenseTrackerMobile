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
import { useForm, Controller } from "react-hook-form";

export default function LoginScreen() {
  const { control, handleSubmit, errors } = useForm();
  const { loginUser, changeNavigation, user } = React.useContext(Context);
  const namesInputRef = React.useRef();
  const emailInputRef = React.useRef();
  const phoneInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const [sending, setsending] = React.useState(false);

  const onSubmit = async (data) => {
    const dataToSend = {
      names: data.names,
      password: data.password,
    };
    if (!data.email && !data.phone) {
      Toast.show("Fill Email or Phone number", Toast.LONG);
      return;
    }
    if (data.email) dataToSend.email = data.email;
    if (data.phone) dataToSend.phone = data.phone;
    if (!data.password || !data.names) {
      Toast.show("Check all fields", Toast.LONG);
      return;
    }
    setsending(true);
    let response;
    await axios
      .post(`${url}/api/users/register`, dataToSend)
      .then((res) => (response = res.data))
      .catch((err) => {
        if (err.response) {
          response = err.response.data;
        } else {
          response = null;
        }
      });

    if (!response) {
      Toast.show("Error Occured.", Toast.LONG);
      alert("Error occured");
    } else if (response.success) {
      if (loginUser(response)) {
        changeNavigation("Home");
      }
    } else {
      console.log(response);
      Toast.show("Error occured", Toast.LONG);
      alert(response.error || response.message || "Error occured");
    }
    setsending(false);
  };

  React.useEffect(() => {
    if (user.token) {
      changeNavigation("Home");
    }
  }, [user]);

  let errorNamesField = errors.names ? styles.errorLabel : {};
  let errorPasswordField = errors.password ? styles.errorLabel : {};
  let errorEmailField = errors.email ? styles.errorLabel : {};
  let errorPhoneField = errors.phone ? styles.errorLabel : {};
  return (
    <View style={[styles.container]}>
      <View style={styles.form}>
        <Text style={styles.title}>Register here</Text>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Names</Text>
          <Controller
            defaultValue=""
            name="names"
            control={control}
            onFocus={() => namesInputRef.current.focus()}
            rules={{ required: "This field is required." }}
            render={(props) => (
              <TextInput
                {...props}
                style={[styles.formControl, errorNamesField]}
                onChangeText={(text) => props.onChange(text)}
                ref={namesInputRef}
              ></TextInput>
            )}
          ></Controller>
          {errors.names && <Text style={styles.error}>Enter names</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            onFocus={() => emailInputRef.current.focus()}
            rules={{
              required: "This field is required.",
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
            }}
            render={(props) => (
              <TextInput
                {...props}
                style={[styles.formControl, errorEmailField]}
                onChangeText={(text) => props.onChange(text)}
                ref={emailInputRef}
              ></TextInput>
            )}
          ></Controller>
          {errors.email && (
            <Text style={styles.error}>
              {errors.email.type === "required"
                ? "Enter Email"
                : "Enter a valid email"}
            </Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <Controller
            defaultValue=""
            name="phone"
            control={control}
            onFocus={() => phoneInputRef.current.focus()}
            render={(props) => (
              <TextInput
                {...props}
                style={[styles.formControl, errorPhoneField]}
                onChangeText={(text) => props.onChange(text)}
                ref={phoneInputRef}
              ></TextInput>
            )}
          ></Controller>
          {errors.phone && <Text style={styles.error}>Enter Phone number</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            onFocus={() => passwordInputRef.current.focus()}
            rules={{ required: "This field is required." }}
            render={(props) => (
              <TextInput
                {...props}
                style={[styles.formControl, errorPasswordField]}
                onChangeText={(text) => props.onChange(text)}
                ref={passwordInputRef}
                secureTextEntry={true}
              ></TextInput>
            )}
          ></Controller>
          {errors.password && <Text style={styles.error}>Enter Password</Text>}
        </View>

        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "#fff" }}>
            {sending ? "Wait..." : "Register"}
          </Text>
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
