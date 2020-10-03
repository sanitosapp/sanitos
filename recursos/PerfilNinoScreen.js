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
export default class PerfilNinoScreen extends React.Component {
  static navigationOptions = {
    headerShown: true,
  };

  state = {
    name: "",
  };

  state = {
    escolaridade: "",
  };

  state = {
    sangre: "",
  };

  state = {
    data: "",
  };


  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerCards}></View>

        <View>
          <View
            style={styles.boxIconos}
          >
            <View style={styles.containerIconos}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Peso")}
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
  }
}