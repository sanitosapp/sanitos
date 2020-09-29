import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
} from "react-native";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesProfileScreen";

//VISTA PERFIL USUARIO

export default class ProfileScreen extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
  };

  reauthenticate = () => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Se cambio la contraseña");
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <Text
          style={styles.titleProfile}
        >
          Mi perfil
        </Text>

        <View style={styles.marginContainer}>
          <TextInput style={styles.input}>Hola! </TextInput>
          <TextInput style={styles.input}>Hola </TextInput>
          <TextInput style={styles.input}>Hola! </TextInput>

          <TextInput
            placeholder="Contraseña actual"
            style={styles.input}
            value={this.state.currentPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ currentPassword: text });
            }}
          ></TextInput>
          <TextInput
            placeholder="Contraseña nueva"
            style={styles.input}
            value={this.state.newPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ newPassword: text });
            }}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.button2}
          onPress={this.onChangePasswordPress}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
