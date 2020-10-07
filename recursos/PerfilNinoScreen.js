import React from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
} from "react-native";
import styles from "./styles/stylesPerfilNinoScreen";


//VISTA HOME PRINCIPAL
const PerfilNinoScreen = ({ route, navigation }) => {

  LayoutAnimation.easeInEaseOut();
  const { id } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerCards}>
      <Text>id:{JSON.stringify(id)}</Text>
      </View>

      <View>
        <View
          style={styles.boxIconos}
        >
          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => {navigation.navigate("Peso",{ idPeso:id})} }
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/peso.png")}
                style={styles.iconCenter}
              />
              <Text
                style={styles.textIcon}
              >
                Peso
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Estatura")}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/estatura.png")}
                style={styles.iconCenter}
              />
              <Text
                style={styles.textIcon}
              >
                Estatura
                </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={styles.containerIcon2}
        >
          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Vacunas")}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/crecimiento.png")}
                style={styles.iconCenter}
              />
              <Text
                style={styles.textIcon}
              >
                Estadistica
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerIconos}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Vacunas")}
            >
              <Image
                resizeMode="contain"
                source={require("../recursos/imagenes/vacunas.png")}
                style={styles.iconCenter}
              />
              <Text
                style={styles.textIcon}
              >
                Vacunas
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PerfilNinoScreen;