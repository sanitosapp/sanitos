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
import { firebase } from "./utils/firebase";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "./styles/stylesProfileScreen";

//VISTA PERFIL USUARIO

const CuentaScreen = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const reauthenticate = () => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user,
            currentPassword
        );
        return user.reauthenticateWithCredential(cred);
    };

    const onChangePasswordPress = () => {
        reauthenticate(currentPassword)
            .then(() => {
                var user = firebase.auth().currentUser;
                user
                    .updatePassword(newPassword)
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

    const signOutUser = () => {
        firebase.auth().signOut();
    };

    return (
        <View style={styles.container}>

            <View style={styles.marginContainer}>
                <TextInput style={styles.input} >Nombre </TextInput>
                <TextInput style={styles.input}>Correo </TextInput>

                <TextInput
                    placeholder="Contraseña actual"
                    style={styles.input}
                    value={currentPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setState({ currentPassword: text });
                    }}
                ></TextInput>
                <TextInput
                    placeholder="Contraseña nueva"
                    style={styles.input}
                    value={newPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setState({ newPassword: text });
                    }}
                ></TextInput>
            </View>
            {/* <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onChangePasswordPress}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default CuentaScreen;
