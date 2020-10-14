import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/stylesHomeScreen";

const CardVacuna = ({ vacunaEstado, navigation }) => {
  return vacunaEstado.map((doc, index) => {
    console.log(doc)
    const { vaccines, dose, reinforcement, state } = doc;
    return (
      <TouchableOpacity
        style={styles.infoCard}
        key={index}
        onPress={() => {
          navigation.navigate("VacunasInfo", {
            id: doc,
          });
        }}
      >
        <View>
          <Text style={styles.textName}>{vaccines}</Text>
        </View>

        <View style={styles.rowCard}>
          <View>
            <Image
              source={require("../../recursos/imagenes/logoSanitos.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <View style={styles.paddingCard}>
            <Text>Vacuna: {vaccines} </Text>
            <Text>dosis: {dose} </Text>
            <Text>refuerzo: {reinforcement}</Text>
            <Text>estado: {state} </Text>
          </View>
        </View>
        <View>
            <Text style={styles.textCard}> + Presiona aqui para ver mas </Text>
        </View>
      </TouchableOpacity>
    );
  });
};

export default CardVacuna;
