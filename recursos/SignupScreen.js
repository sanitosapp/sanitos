import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesSignupScreen";

const SignupScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSignUp = () => {
    if (email !== "" && password !== "" && name !== "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          return userCredentials.user.updateProfile({
            displayName: name,
          });
        })
        .catch((error) => setErrorMessage(error.message));
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>

      <View>
        <Text style={styles.greeting}>{"Regístrese"}</Text>
      </View>

      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <TextInput
            placeholder={"Nombre"}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
          ></TextInput>
        </View>

        <View>
          <TextInput
            placeholder={"Email"}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>
        </View>
        <View>
          <TextInput
            placeholder={"Contraseña"}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={{ color: "#ffffff", fontWeight: "500" }}>Regístrate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonFb}>
        <Text style={{ color: "#ffffff", fontWeight: "500" }}>
          Ingresar con Facebook
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", position: "absolute", top: 564 }}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={{ color: "#414959", fontSize: 14 }}>
          Ya tienes cuenta?{" "}
          <Text style={{ fontWeight: "500", color: "#05A4AC" }}>
            Inicia sesión
          </Text>
        </Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Importante"
        message="debe ingresar todos los campos"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        confirmButtonColor="#E9446A"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  greeting: {
    marginTop: 84,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color: "#424242",
  },
  errorMessage: {
    color: "#E9446A",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#C4C4C4",
    height: 40,
    fontSize: 16,
    color: "#161F3D",
    padding: 10,
  },
  button: {
    marginTop: 18,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(251, 22, 98, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFb: {
    marginTop: 18,
    backgroundColor: "#3C609F",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 70,
  },
});

export default SignupScreen;
