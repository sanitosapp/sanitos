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
import childDataTest from "./utils/childDataTest.json";
import {MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";


//VISTA HOME PRINCIPAL
const PerfilNinoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [user, setUser] = useState({});

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { id } = route.params;
    setUser(id);
  }, []);

  /* const getDataTarget {user.name}= async (id) => {

  } */

  const getRecordChild = () => {
    let partsZero = childDataTest.fechaNacimiento.split("-");
    let fechaZero = new Date(partsZero[2], partsZero[1] - 1, partsZero[1]);
    let registrosEstatura = childDataTest.historialEstatura;
    let registrosPeso = childDataTest.historialPeso;
    let lastRegistroEstatura = { index: 0, value: 0 };
    let lastRegistroPeso = { index: 0, value: 0 };

    var historialEstatura = [];
    var historialPeso = [];

    //Conversión de Json historico estatura en formato de data para gráfico
    registrosEstatura.forEach((value) => {
      let parts = value.fechaRegistro.split("-");
      let fechaRegistro = new Date(parts[2], parts[1] - 1, parts[1]);

      let Difference_In_Time = fechaRegistro.getTime() - fechaZero.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (lastRegistroEstatura.index <= Difference_In_Days) {
        lastRegistroEstatura.index = Difference_In_Days;
        lastRegistroEstatura.value = value.estatura;
      }

      historialEstatura[Difference_In_Days] = value.estatura;
    });

    //Conversión de Json historico peso en formato de data para gráfico
    registrosPeso.forEach((value) => {
      let parts = value.fechaRegistro.split("-");
      let fechaRegistro = new Date(parts[2], parts[1] - 1, parts[1]);

      let Difference_In_Time = fechaRegistro.getTime() - fechaZero.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (lastRegistroPeso.index <= Difference_In_Days) {
        lastRegistroPeso.index = Difference_In_Days;
        lastRegistroPeso.value = value.peso;
      }

      historialPeso[Difference_In_Days] = value.peso;
    });

    return {
      lastRegistroEstatura: lastRegistroEstatura,
      lastRegistroPeso: lastRegistroPeso,
      historicoEstatura: historialEstatura,
      historicoPeso: historialPeso,
      nombre: childDataTest.nombre,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCards}>
        <View style={styles.infoCard}>
          <View style={styles.rowCard}>
            <View>
              <Image
                source={require("../recursos/imagenes/logoSanitos.png")}
                style={{height:70,width:80,marginVertical:40}}
              />
            </View>
            <View style={styles.paddingCard}>
              <Text style={styles.textCard}>{user.name} </Text>
              <Text style={styles.textCard}>Fecha nacimiento:{"\n"}{user.birthday} </Text>
              <Text style={styles.textCard}>Tipo de sangre: {user.bloodType}</Text>
              <Text style={styles.textCard1}>Sexo: {user.gender} </Text>
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
              <MaterialCommunityIcons style={styles.iconCenter} name="weight" size={40} color="#1D96A3" />
              <Text style={styles.textIcon}>Peso</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Estatura", { idPesos: user });
              }}
            >
              <MaterialCommunityIcons style={styles.iconCenter} name="human-male-height" size={40} color="#1D96A3" />
              <Text style={styles.textIcon}>Estatura</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerIcon2}>
          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                let data = getRecordChild();
                navigation.navigate("ChildChart", data);
              }}
            >
              <MaterialCommunityIcons style={styles.iconCenter} name="chart-areaspline-variant" size={40} color="#1D96A3" />
              <Text style={styles.textIcon}>Curva de crecimiento</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Vacunas", { idPesos: user });
              }}
            >
              <MaterialCommunityIcons style={styles.iconCenter} name="ammunition" size={40} color="#1D96A3" />
              <Text style={styles.textIcon}>Vacunas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PerfilNinoScreen;
