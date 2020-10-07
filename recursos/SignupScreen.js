import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler"
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesSignupScreen";
import LoadingScreen from "./LoadingScreen"


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (email !== "" && password !== "" && cpassword !== "" && name !== "")
      if (password === cpassword) {
        setLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            return userCredentials.user.updateProfile({
              displayName: name,
            });
          })
          .catch((error) => {
            setLoading(false);
          setErrorMessage(error.message)
          });
      } else {
        setShowAlert(true);
      }
  };

  return isLoading ? (
    <View style={styles.container}>
      <LoadingScreen />
    </View>
  ) : (

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
          <View>
            <TextInput
              placeholder={"Repetir contraseña"}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(cpassword) => setCPassword(cpassword)}
              value={cpassword}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFb}>
          <Text style={styles.buttonText}>
            Ingresar con Facebook
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => navigation.push("Login")}
        >
          <Text style={styles.textButton}>
            Ya tienes cuenta?{" "}
            <Text style={styles.textButton2}>
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
    )
    ;
};

export default SignupScreen;
