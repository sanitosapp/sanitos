import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import styles from "../styles/stylesLoginRegisterScreen";

//VISTA ATERRIZAJE USUARIO

const LoginRegisterScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
        resizeMode="contain"
        source={require("../imagenes/logoSanitos.png")}
        style={styles.icon}
      />
      <View
      style={styles.containerButton1}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Login")}
        >
          <Text style={styles.textButton}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
      <View
      style={styles.containerButton2}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Register")}
        >
          <Text style={styles.textButton}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginRegisterScreen;
