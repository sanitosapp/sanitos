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

  constructor() {
    super();
    this.state = {
      Nino: "",
    };
    try {
      AsyncStorage.getItem("database_ninoinfo1").then((value) => {
        this.setState({
          Nino: JSON.parse(value),
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  parseData() {
    if (this.state.Nino) {
      return this.state.Nino.map((dataNino, i) => {
        return (
          <View
            //MOSTRANDO LA DATA RECOLECTADA DEL NIÑO
            style={styles.infoCard}
            key={i}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#05A4AC",
                  padding: 6,
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                {dataNino.name}{" "}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <Image
                  source={require("../recursos/imagenes/logoSanitos.png")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Text>{dataNino.escolaridade} </Text>
                <Text>{dataNino.sangre} </Text>
                <Text>{dataNino.data} </Text>
              </View>
            </View>
          </View>
        );
      });
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerCards}>{this.parseData()}</View>

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