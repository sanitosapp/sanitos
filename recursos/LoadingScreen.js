import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesLoadingScreen";


const LoadingScreen = ({navigation}) => {
/*   componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.push(user ? "App" : "Auth");
    });
  }; */

  /* useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => 
      navigation.push(user ? "App" : "AuthStack"));
  }) */

/*   useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, displayName, uid } = firebase.auth().currentUser;
    console.log(uid);
    setDisplayName(displayName);
    getData(uid);
    setEmail(email);
  }, []); */

    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
}

export default LoadingScreen;