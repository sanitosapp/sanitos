import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
  YellowBox,
} from "react-native";
import { set } from "react-native-reanimated";
import styles from "./styles/stylesPerfilNinoScreen";


//VISTA HOME PRINCIPAL
const PerfilNinoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [user, setUser] = useState({});

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { id } = route.params;
    setUser(id[0]);
  }, []);

  /* const getDataTarget {user.name}= async (id) => {

  } */

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerCards}>
      <View style={styles.infoCard}>
              

              <View style={styles.rowCard}>
                <View>
                  <Image
                    source={require("../recursos/imagenes/logoSanitos.png")}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={styles.paddingCard}>
                  <Text>{user.name} </Text>
                  <Text>Edad: {user.birthday} </Text>
                  <Text>Tipo de sangre: {user.bloodType}</Text>
                  <Text>Sexo: {user.gender} </Text>
                </View>
              </View>
            </View>
      </View>

      <View>
        <View style={styles.boxIconos}>
          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Peso", { idPesos: user });
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/peso.png")}
                style={styles.iconCenter}
              />
              <Text style={styles.textIcon}>Peso</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() =>{
                navigation.navigate("Estatura", { idPesos: user });
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/estatura.png")}
                style={styles.iconCenter}
              />
              <Text style={styles.textIcon}>Estatura</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerIcon2}>
          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Vacunas", { idPesos: user });
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/crecimiento.png")}
                style={styles.iconCenter}
              />
              <Text style={styles.textIcon}>Estadistica</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Vacunas", { idPesos: user });
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/vacunas.png")}
                style={styles.iconCenter}
              />
              <Text style={styles.textIcon}>Vacunas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PerfilNinoScreen;