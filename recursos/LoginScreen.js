import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesLoginScreen";
import LoadingScreen from "./LoadingScreen"

//VISTA LOGIN

const LoginScreen = ({navigation}) => {
  LayoutAnimation.easeInEaseOut();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          isLoading(false);
          setErrorMessage(error.message)
        });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.greeting}>"Inicie sesión"</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View>
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.push("")}>
        <Text style={styles.textRecoverpassword}>¿Olvido su contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.textbutton}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonFb}>
        <Text style={styles.textbutton}>Ingresar con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => navigation.push("Register")}
      >
        <Text style={{ color: "#414959", fontSize: 14 }}>
          ¿No tiene cuenta?{" "}
          <Text style={{ fontWeight: "500", color: "#05A4AC" }}>
            Registrese aquí
          </Text>
        </Text>
      </TouchableOpacity>

      {/* <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Importante"
        message="Debe ingresar su correo y contraseña"
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
      /> */}
    </View>
  );
};

export default LoginScreen;
