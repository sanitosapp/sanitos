import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesLoadingScreen";


export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

