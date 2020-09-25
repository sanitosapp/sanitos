import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import styles from "./styles/stylesLoginRegisterScreen";

//VISTA REGISTRO USUARIO NUEVO

const LoginRegisterScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
        resizeMode="contain"
        source={require("../recursos/imagenes/logoSanitos.png")}
        style={styles.icon}
      />

      <TouchableOpacity
        style={styles.buttonL}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.textButtonL}>Inicia sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonR}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={styles.textButtonR}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginRegisterScreen;
