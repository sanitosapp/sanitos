import React from "react";
import {
  View,
  Picker,
  Alert,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from "./styles/stylesPostScreen";


//FORMULARIO AGREGAR NIÑO
export default class PostScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    hijo: "",
  };

  state = {
    peso: "",
  };

  state = {
    estatura: "",
  };

  state = {
    data: "",
  };

  changePeso(peso) {
    this.setState({ peso });
  }

  changeEstatura(estatura) {
    this.setState({ estatura });
  }

  changeDate = (valor) => {
    this.setState({
      data: valor,
    });
  };

  buttonPressed() {
    const arrayDataMedidas = [];
    if (
      this.state.peso &&
      this.state.hijo &&
      this.state.estatura &&
      this.state.data
    ) {
      const dataMedidas = {
        peso: this.state.peso,
        hijo: this.state.hijo,
        estatura: this.state.estatura,
        data: this.state.data,
      };
      arrayDataMedidas.push(dataMedidas);
      try {
        AsyncStorage.getItem("database_medidasInfo").then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(dataMedidas);
            AsyncStorage.setItem(
              "database_medidasInfo",
              JSON.stringify(d)
            ).then(() => {
              this.props.navigation.navigate("Peso");
            });
          } else {
            AsyncStorage.setItem(
              "database_medidasInfo",
              JSON.stringify(arrayDataMedidas)
            ).then(() => {
              this.props.navigation.navigate("Peso");
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View>
            <Text style={styles.title1}>Agregar medidas</Text>
          </View>

          <View
            style={styles.pickerBox}
          >
            <Picker
              style={styles.pickerComponent}
              selectedValue={this.state.hijo}
              onValueChange={(itemValor, itemIndex) =>
                this.setState({
                  hijo: itemValor,
                })
              }
            >
              <Picker.Item label="Selecciona hija/o" value="" />
              <Picker.Item label="Juana" value="Juana" />
              <Picker.Item label="Martin" value="Martin" />
            </Picker>
          </View>

          <View style={styles.marginInput}>
            <TextInput
              style={styles.input}
              placeholder="Peso"
              keyboardType="decimal-pad"
              returnKeyType="next"
              maxLength={6}
              autoCapitalize="none"
              onChangeText={(peso) => this.changePeso(peso)}
              value={this.state.peso}
            ></TextInput>
          </View>

          <View style={styles.marginInput}>
            <TextInput
              style={styles.input}
              placeholder="Estatura"
              keyboardType="decimal-pad"
              returnKeyType="next"
              maxLength={6}
              autoCapitalize="none"
              onChangeText={(estatura) => this.changeEstatura(estatura)}
              value={this.state.estatura}
            ></TextInput>
          </View>

          <View>
            <DatePicker
              androidMode="spinner"
              placeholder="Fecha"
              mode="date"
              format="DD/MM/YYYY"
              style={styles.dateComponent}
              date={this.state.data}
              onDateChange={this.changeDate}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.buttonPressed()}
          >
            <Text style={styles.textButton}>Agregar</Text>
          </TouchableOpacity>
          <View></View>
        </View>
      </View>
    );
  }
}