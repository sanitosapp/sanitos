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
import { EvilIcons,AntDesign } from '@expo/vector-icons'; 

//VISTA LOGIN

const LoginScreen = ({ navigation }) => {
  LayoutAnimation.easeInEaseOut();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.textTitle}>Inicie sesión</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View>
        <View
          style={styles.input1}
        >
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View
          style={styles.input2}
        >
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
        <Text style={styles.textForgotPass}>¿Olvido su contraseña?</Text>
      </TouchableOpacity>

      <View
      style={styles.button1}
      >
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.textbutton}>Ingresar</Text>
        </TouchableOpacity>
      </View>

      <View
      style={styles.button2}
      >
        <TouchableOpacity style={styles.buttonFb}>
        <EvilIcons name="sc-facebook" size={30} color="white" />
          <Text style={styles.textbutton}>Ingresar con Facebook</Text>
        </TouchableOpacity>
      </View>

      <View
      style={styles.button3}
      >
        <TouchableOpacity style={styles.buttonGo}>
        <AntDesign name="google" size={20} color="red" />
          <Text style={styles.textbutton1}>Ingresar con Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.containerTextRegister}
        onPress={() => navigation.push("Register")}
      >
        <Text style={{ color: "#B0B0B0", fontSize: 12 }}>
          ¿No tiene cuenta?{" "}
          <Text style={{ fontWeight: "500", color: "#1D96A3" }}>
            Registrese aquí
          </Text>
        </Text>
      </TouchableOpacity>

      <AwesomeAlert
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
        confirmButtonColor="#C13273"
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

export default LoginScreen;
