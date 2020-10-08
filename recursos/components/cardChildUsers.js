import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/stylesHomeScreen";

const CardChildUsers = ({ childUsers, navigation }) => {
  return childUsers.map((doc, index) => {
    const { name, birthday, bloodType, gender } = doc;
    return (
      <TouchableOpacity
        style={styles.infoCard}
        key={index}
        onPress={() => {
          navigation.navigate("Nino", {
            id: childUsers,
          });
        }}
      >
        <View>
          <Text style={styles.textName}>{name}</Text>
        </View>

        <View style={styles.rowCard}>
          <View>
            <Image
              source={require("../../recursos/imagenes/logoSanitos.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <View style={styles.paddingCard}>
            <Text>Nombre: {name} </Text>
            <Text>Edad: {birthday} </Text>
            <Text>Tipo de sangre: {bloodType}</Text>
            <Text>Sexo: {gender} </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Nino", {
                id: childUsers,
              });
            }}
          >
            <Text style={styles.textCard}> + Presiona aqui para ver mas </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });
};

export default CardChildUsers;
