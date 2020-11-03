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

const SingOutScreen = () => {

   const signOutUser = () => {
        firebase.auth().signOut();
    };


    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => signOutUser()}>
                <Text style={styles.buttonText}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SingOutScreen;