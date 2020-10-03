import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import styles from "./styles/stylesLoginRegisterScreen";

//VISTA REGISTRO USUARIO NUEVO

const LoginRegisterScreen = ({navigation}) => {
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
        onPress={() => navigation.push("Login")}
      >
        <Text style={styles.textButtonL}>Inicia sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonR}
        onPress={() => navigation.push("Register")}
      >
        <Text style={styles.textButtonR}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginRegisterScreen;
