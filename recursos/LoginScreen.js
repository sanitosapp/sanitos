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
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as Facebook from "expo-facebook";
import { androidClientId } from "./utils/const";;

/* SOCIAL MEDIA */
const appId = Constants.manifest.facebookAppId;

const LoginWithGoogle = async () => {
  try {
    const { type, idToken, accessToken } = await Google.logInAsync({
      androidClientId,
      clientId: androidClientId,
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      // return result.accessToken;
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      firebase.auth().signInWithCredential(credential)
        .then(user => { // All the details about user are in here returned from firebase
          // console.log('Logged in successfully', user)
        })
        .catch((error) => {
          console.log('Error occurred ', error)
        });
    } else {
      return { cancelled: true };
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

const Facebooklogin = async () => {
  try {
    await Facebook.initializeAsync(appId); // enter your Facebook App Id 
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        .then(user => { // All the details about user are in here returned from firebase
          // console.log('Logged in successfully', user)
        })
        .catch((error) => {
          console.log('Error occurred ', error)
        });
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

//VISTA LOGIN

const LoginScreen = ({ navigation }) => {

  // React.useEffect(() => {
  //   console.log("androidClientId", androidClientId);
  // }, []);

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

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "891797980558-7ddtuciou9g4v8hmc02il7odvg56oeh2.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

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
        <Text style={styles.textForgotPass}>¿Olvidó su contraseña?</Text>
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
        <TouchableOpacity style={styles.buttonFb} onPress={Facebooklogin}>
          <EvilIcons name="sc-facebook" size={30} color="white" />
          <Text style={styles.textbutton}>Ingresar con Facebook</Text>
        </TouchableOpacity>
      </View>

      <View
        style={styles.button3}
      >
        <TouchableOpacity style={styles.buttonGo}
          onPress={() => LoginWithGoogle()}
        >
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
            Regístrese aquí
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
