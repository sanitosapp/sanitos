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
          style={{
            marginTop: 60,
            textAlign: "center",
            color: "#424242",
            fontSize: 16,
          }}
        >
          Mi perfil
        </Text>

        <View style={{ marginTop: 32 }}>
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
          <Text style={{ color: "#fff", fontSize: 16 }}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Salir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 18,
    left: 30,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    width: 300,
    fontSize: 16,
    color: "#C4C4C4",
    padding: 10,
  },
  button: {
    position: "absolute",
    top: 522,
    left: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    position: "absolute",
    top: 464,
    left: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});
