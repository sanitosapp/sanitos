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

//VISTA HOME PRINCIPAL
const PerfilNinoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [user, setUser] = useState({});

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { id } = route.params;
    setUser(id);
  }, []);

  useEffect(() => {
    /*  const Api = `https://us-central1-sanitosapp-d0b5f.cloudfunctions.net/getDataCharts`;

    fetch(Api, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: "43fxtytAfSchYvzWaDO1DKymTNz2",
        childId: "IE0HDEuW7NeCB9b4ARUr",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data)); */
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
              onPress={() => {
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
                let data = getRecordChild();
                navigation.navigate("ChildChart", data);
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
