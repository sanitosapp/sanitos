import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/stylesHomeScreen";

const CardChildUsers = ({ childUsers, navigation }) => {
  return childUsers.map((doc, index) => {
    console.log(doc)
    const { name, birthday, bloodType, gender } = doc;
    return (
      <TouchableOpacity
        style={styles.infoCard}
        key={index}
        onPress={() => {
          navigation.navigate("Nino", {
            id: doc,
          });
        }}
      >
        <View>
          <Text style={styles.textName}>{name}</Text>
        </View>

        <View style={styles.rowCard}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../../recursos/imagenes/logoSanitos.png")}
                style={{ width: 70, height: 60, margin: 6 }}
              />
            </View>
            <View style={styles.paddingCard}>
              <Text style={styles.textCardChild} >Nombre: <Text style={styles.textCardChildName}>{name}</Text> </Text>
              <Text style={styles.textCardChild}>Edad: {birthday} </Text>
              <Text style={styles.textCardChild}>Tipo de sangre: {bloodType}</Text>
              <Text style={styles.textCardChild}>Sexo: {gender} </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textCard}> + Presiona aqui para ver mas </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  });
};

export default CardChildUsers;
