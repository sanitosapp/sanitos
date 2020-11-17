import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
} from "react-native";
import { firebase } from "../utils/firebase";
import styles from "../styles/stylesProfileScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

//VISTA PERFIL USUARIO

const ProfileScreen = ({navigation}) => {

   //FUNCION PARA CERRAR SESION
  const signOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop:30}}>
        <TouchableOpacity style={styles.cardCuenta} onPress={() => navigation.navigate("Cuentaa")}>
          <Text style={{ fontSize:16, color:"#c4c4c4"}} >Ver mi cuenta</Text>
          <MaterialCommunityIcons name="keyboard-tab" size={24} color="#c4c4c4" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop:380}}>
      <TouchableOpacity style={styles.button} onPress={() => signOutUser()}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
