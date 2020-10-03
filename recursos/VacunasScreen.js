import React from "react";
import {
  Picker,
  Modal,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./styles/stylesVacunasScreen";


//VISTA HOME PRINCIPAL
export default class VacunasScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    isDateTimePickerVisible: true,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    this._hideDateTimePicker();
  };

  constructor() {
    super();
    this.state = {
      data: [
        {
          dosis: "Única dosis",
          vacuna: "BCG",
          estado: "false",
        },
        {
          dosis: "Única dosis",
          vacuna: "Hepatitis B",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Pentavalente",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Polio inyección",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Rotavirus",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Neumococo",
          estado: "false",
        },

        {
          dosis: "2da dosis",
          vacuna: "Pentavalente",
          estado: "false",
        },
        {
          dosis: "2da dosis",
          vacuna: "Polio inyección",
          estado: "false",
        },

        {
          dosis: "2da dosis",
          vacuna: "Rotavirus",
          estado: "false",
        },
        {
          dosis: "2da dosis",
          vacuna: "Neumococo",
          estado: "false",
        },
        {
          dosis: "3ra dosis",
          vacuna: "Pentavalente",
          estado: "false",
        },
        {
          dosis: "3ra dosis",
          vacuna: "Polio oral",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Influenza",
          estado: "false",
        },
        {
          dosis: "2da dosis",
          vacuna: "Influenza estacional",
          estado: "false",
        },
        {
          dosis: "3ra dosis",
          vacuna: "Neumococo",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "SPR",
          estado: "false",
        },
        {
          dosis: "1ra dosis",
          vacuna: "Varicela",
          estado: "false",
        },
        {
          dosis: "2da dosis",
          vacuna: "Influenza",
          estado: "false",
        },
        {
          dosis: "Única dosis",
          vacuna: "Fiebre amarilla",
          estado: "false",
        },
        {
          dosis: "2da dosis",
          vacuna: "SRP",
          estado: "false",
        },
        {
          dosis: "",
          vacuna: "DTP",
          refuerzo: "1er refuerzo",
          estado: "false",
        },
        {
          dosis: "",
          vacuna: "Polio oral",
          refuerzo: "1er refuerzo",
          estado: "false",
        },
        {
          dosis: "",
          vacuna: "DTP",
          refuerzo: "2do refuerzo",
          estado: "false",
        },
        {
          dosis: "",
          vacuna: "Polio oral",
          refuerzo: "Refuerzo",
          estado: "false",
        },
      ],
    };
  }
  /* 
    filterVacuna() {
      const newdata = this.state.data.filter((item) => {
        return item !== '1ra'
      })
      this.setState({
        data: newdata
      });
    } */

  /*  buttonPressed() {
     return (
       <View
         style={styles.infoCard}>
 
 
 
         <View
           style={{ padding: 10, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}
         >
           <Text>Neumococo</Text>
           <TouchableOpacity
             onPress={() => this.props.navigation.navigate('Nino')}
           >
             <MaterialIcons
               name='add'
               size={20}
               color='black'
             />
           </TouchableOpacity>
         </View>
 
       </View>
     )
   } */

  state = {
    data: "",
  };
  state = {
    peso: "",
  };

  state = {
    modalVisible: false,
    dosis: "",
    vacuna: "",
    refuerzo: "",
    estado: "false",
  };

  setModalVisible = (visible, item) => {
    this.setState({
      modalVisible: visible,
      dosis: item.dosis,
      vacuna: item.vacuna,
      refuerzo: item.refuerzo,
      estado: item.estado,
    });
  };

  render() {
    const { date, open } = this.state;
    const value = date ? date.toLocaleString() : "";

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Nino")}
        >
          <Text
            style={styles.breadCrumb}
          >
            {"< Infomación < Vacunas"}{" "}
          </Text>
        </TouchableOpacity>

        <View
          style={styles.buttonBox}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.title}>Vacunas pendientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.title}>Vacunas aplicadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.title}>Todas</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.infoCard}>
              <Text
                style={styles.vacuna}
              >
                {item.dosis}
                {item.refuerzo}{" "}
              </Text>
              <Text
                style={styles.vacuna1}
              >
                {item.vacuna}{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, item);
                }}
              >
                <MaterialIcons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredViews}>
            <View style={styles.modalView}>
              <MaterialIcons
                name="close"
                size={24}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, {
                    modalVisible: false,
                    dosis: "",
                    vacuna: "",
                    refuerzo: "",
                    estado: "false",
                  });
                }}
              ></MaterialIcons>

              <View style={styles.form}>
                <View
                  style={styles.formBox}
                >
                  <Text>{"Vacuna:" + this.state.vacuna}</Text>
                  <Picker
                    style={styles.pickerComponent}
                    selectedValue={this.state.estado}
                    onValueChange={(itemValor, itemIndex) =>
                      this.setState({
                        hijo: itemValor,
                      })
                    }
                  >
                    <Picker.Item label="Estado" value="0" />
                    <Picker.Item label="Aplicada" value={"true"} />
                    <Picker.Item label="Pendiente" value={"false"} />
                  </Picker>
                </View>

                <View>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={this.state.data}
                    onDateChange={this.changeDate}
                  />
                </View>

                <TouchableOpacity
                  style={styles.cumpleaños}
                  onPress={this._showDateTimePicker}
                >
                  <Text
                    style={styles.textCumpleaños}
                  >
                    Cumpleaños
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.textAgregar}>
                    Agregar
                  </Text>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
          </View>
        </Modal>

        <View></View>
      </SafeAreaView>
    );
  }
}


