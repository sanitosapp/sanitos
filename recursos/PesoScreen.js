import React from "react";
import {
  Alert,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
  Modal,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesPesoScreen";


//VISTA HOME PRINCIPAL
export default class PesoScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    peso: "",
  };

  state = {
    data: "",
  };

  changePeso(peso) {
    this.setState({ peso });
  }

  changeDate = (valor) => {
    this.setState({
      data: valor,
    });
  };

  buttonPressed() {
    const arrayDataNino = [];
    if (this.state.peso && this.state.data) {
      const dataNino = {
        peso: this.state.peso,
        data: this.state.data,
      };
      arrayDataNino.push(dataNino);
      try {
        AsyncStorage.getItem("database_peso").then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(dataNino);
            AsyncStorage.setItem("database_peso", JSON.stringify(d)).then(
              () => {
                this.modalHandler();
              }
            );
          } else {
            AsyncStorage.setItem(
              "database_peso",
              JSON.stringify(arrayDataNino)
            ).then(() => {
              this.modalHandler();
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert("Falta completar un campo");
    }
  }

  state = {
    isVisible: false,
  };

  modalHandler = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  state = {
    email: "",
    displayName: "",
  };


  constructor() {
    super();
    this.state = {
      Nino: "",
    };
    try {
      AsyncStorage.getItem("database_peso").then((value) => {
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
          <View style={styles.infoCard} key={i}>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{dataNino.data} </Text>
              <Text>{dataNino.peso} kg </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Nino")}
              >
                <Feather name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
    }
  }

  render() {
    const { isVisible } = this.state;
    LayoutAnimation.easeInEaseOut();

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Nino")}
        >
          <Text
            style={styles.breadCrumb}
          >
            {"< Infomación < Peso"}{" "}
          </Text>
        </TouchableOpacity>

        <View
          style={styles.boxTitle}
        >
          <Text style={styles.textWhite}>Fecha</Text>
          <Text style={styles.textWhite}>Peso</Text>
        </View>

        <View style={styles.containerCards}>{this.parseData()}</View>
        <View>
          <TouchableOpacity style={styles.button} onPress={this.modalHandler}>
            <Text style={styles.textButton}>
              {" "}
              + Agregue nueva medida
            </Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isVisible} transparent={true} animationType="fade">
              <View
                style={styles.boxModal}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  onPress={() => this.modalHandler()}
                ></MaterialIcons>

                <View style={styles.form}>
                  <View>
                    <Text style={styles.title1}>Agregar peso</Text>
                  </View>

                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Peso"
                      autoCapitalize="none"
                      onChangeText={(peso) => this.changePeso(peso)}
                      value={this.state.peso}
                    ></TextInput>
                  </View>

                  {/* <View>

                    <Picker
                      style={styles.pickerComponent}
                      selectedValue={this.state.hijo}
                      onValueChange={
                        (itemValor, itemIndex) =>
                          this.setState({
                            hijo: itemValor
                          })
                      }

                    >
                      <Picker.Item label='Sexo' value='' />
                      <Picker.Item label='Niña' value='Niña' />
                      <Picker.Item label='Niño' value='Niño' />

                    </Picker>
                  </View> */}

                  <View>
                    <DatePicker
                      format="DD/MM/YYYY"
                      style={styles.dateComponent}
                      date={this.state.data}
                      onDateChange={this.changeDate}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.modalHandler()}
                  >
                    <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                      Agregar
                    </Text>
                  </TouchableOpacity>
                  <View></View>
                </View>
              </View>
        </Modal>
      </ScrollView>
    );
  }
}