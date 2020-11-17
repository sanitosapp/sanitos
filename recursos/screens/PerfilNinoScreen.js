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
import styles from "../styles/stylesPerfilNinoScreen";
import childDataTest from "../utils/childDataTest.json";
import {MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../utils/firebase";
import ServiceManager from "../../service/ServiceManager";

//VISTA PERFIL DE NIÑO
const PerfilNinoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [user, setUser] = useState({});

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { id } = route.params;
    setUser(id);
  }, []);

   //FUNCION PARA DATA A CHARTS
  const postChildDataById = () => {
    const { uid } = firebase.auth().currentUser;
    console.log("TEST:NINO", user);
    console.log("TEST:id:USER", uid);

    let parametros = {
      url: "/getDataCharts",
      data: {
        userId: uid,
        childId: user.id,
      },
    };

    return ServiceManager.prototype.Post(parametros);
  };

   //FUNCION CHARTS
  const getRecordChild = async () => {
    const childData = await postChildDataById();
    console.log("CHILDDATA:", childData);

    let partsZero = childData.birthday.split("/");
    let registrosEstatura = childData.heightHistory;
    let registrosPeso = childData.weightHistory;

    let fechaZero = new Date(partsZero[2], partsZero[1] - 1, partsZero[0]);

    let lastRegistroEstatura = { index: 0, value: 0 };
    let lastRegistroPeso = { index: 0, value: 0 };

    var historialEstatura = [];
    var historialPeso = [];

    //Conversión de Json historico estatura en formato de data para gráfico
    registrosEstatura.forEach((value) => {
      let parts = value.date.split("/");
      let fechaRegistro = new Date(parts[2], parts[1] - 1, parts[0]);

      let Difference_In_Time = fechaRegistro.getTime() - fechaZero.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (lastRegistroEstatura.index <= Difference_In_Days) {
        lastRegistroEstatura.index = Difference_In_Days;
        lastRegistroEstatura.value = value.height;
      }

      historialEstatura[Difference_In_Days] = value.height;
    });

    //Conversión de Json historico peso en formato de data para gráfico
    registrosPeso.forEach((value) => {
      let parts = value.date.split("/");
      let fechaRegistro = new Date(parts[2], parts[1] - 1, parts[0]);

      let Difference_In_Time = fechaRegistro.getTime() - fechaZero.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (lastRegistroPeso.index <= Difference_In_Days) {
        lastRegistroPeso.index = Difference_In_Days;
        lastRegistroPeso.value = value.weight;
      }

      // console.log("TEST:fechaZero:", fechaZero);
      // console.log("TEST:fechaZero:getTime:", fechaZero.getTime());
      // console.log("TEST:Diferencias_DIAS:", fechaRegistro.getTime());
      // console.log("TEST:Diferencias_TIEMPO:", Difference_In_Time);

      historialPeso[Difference_In_Days] = value.weight;
    });

    console.log("TEST:historialPeso:", historialPeso);

    return {
      lastRegistroEstatura: lastRegistroEstatura,
      lastRegistroPeso: lastRegistroPeso,
      historicoEstatura: historialEstatura,
      historicoPeso: historialPeso,
      nombre: childData.name,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCards}>
        <View style={styles.infoCard}>
          <View style={styles.rowCard}>
            <View>
              <Image
                source={{uri:user.image}}
                style={{height:100,width:100,marginVertical:20, borderRadius:360}}
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
              onPress={async () => {
                let data = await getRecordChild();
                navigation.navigate("ChildChart", data);
              }}
            >
              <MaterialCommunityIcons style={styles.iconCenter} name="chart-areaspline-variant" size={40} color="#1D96A3" />
              <Text style={styles.textIcon}>Crecimiento</Text>
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
