import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/stylesHomeScreen";
import { MaterialIcons } from "@expo/vector-icons";

const CardChildUsers = ({ childUsers, navigation }) => {

  return childUsers.map((doc, index) => {
    const { name, birthday, bloodType, gender, image } = doc;
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
        <View style={styles.nameContainer} >
          <Text style={styles.textName}>{name}</Text>
          <TouchableOpacity style={styles.iconName} onPress={() => openModal(doc)}>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.rowCard}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={{ uri: image }}
                style={{
                  width: 60,
                  height: 60,
                  marginHorizontal: 18,
                  marginVertical: 6,
                  borderRadius: 360,
                }}
              />
            </View>
            <View style={styles.paddingCard}>
              <Text style={styles.textCardChild}>Nacimiento: {birthday} </Text>
              <Text style={styles.textCardChild}>
                Tipo de sangre: {bloodType}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
};

export default CardChildUsers;
