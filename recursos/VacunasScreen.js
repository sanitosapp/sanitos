import React, { useState, useEffect } from "react";
import {
  Picker,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/es";
import { firebase } from "./utils/firebase";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./styles/stylesVacunasScreen";


//VISTA HOME PRINCIPAL
const VacunasScreen = ({ route, navigation }) => {

  const [vacuna, setVacuna] = useState([]);
  const [vacunaEstado, setVacunaEstado] = useState([]);
  const [data, setData] = useState("");
  const [estado, setEstado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const changeEstado = (estado) => {
    setEstado(estado);
  };

  const changeDate = (valor) => {
    setData(valor);
  };

const aplicadas = () => {
  
}

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setVacuna(idPesos);
    vacunas(uid, idPesos.id);
  }, []);

  const vacunas = async (uid, childId) => {
    console.log('id', uid);
    console.log('idchi', childId);
    const arrayVacunas = [];
    const querySnapshot = firebase
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .collection("childUsers")
      .doc(childId)
      .collection("vacunas")
    //.where("userId", "==", uid)
    //.where("childId", "==", childId);
    const vacunaId = await querySnapshot.get();
    vacunaId.forEach((doc) => {
      //const { date } = doc.data()
      //const formatoFecha = moment(date.toDate()).format('LL')
      arrayVacunas.push({
        ...doc.data(),
        //date: formatoFecha,
        id: doc.id
      })
    });
    if (arrayVacunas.length > 0) {
      setVacunaEstado(arrayVacunas)
      console.log("arrayVacunas", arrayVacunas);
    }
  };

  /* 
    filterVacuna() {
      const newdata = this.state.data.filter((item) => {
        return item !== '1ra'
      })
      this.setState({
        data: newdata
      });
    } */

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <TouchableOpacity
        onPress={() => navigation.navigate("Nino")}
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
      <View style={styles.containerCards}>
        {vacunaEstado.map((doc) => {
          const { dose, state, vaccine, reinforcement } = doc;
          return (
            <View style={styles.infoCard}>
              <Text style={styles.vacuna}>{vaccine} </Text>
              <Text style={styles.vacuna1}>{dose}{reinforcement} </Text>
              <TouchableOpacity
              onPress={() => { setModalVisible(true) }}
            >
              <MaterialIcons name="add" size={20} color="black" />
            </TouchableOpacity>
            </View>
          )
        }
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredViews}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => { setModalVisible(!modalVisible) }}
            ></MaterialIcons>

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Agregar vacuna</Text>
              </View>
              
              <View
                style={styles.formBox}
              >
                <Picker
                  style={styles.pickerComponent}
                  selectedValue={estado}
                  onValueChange={(estado, itemIndex) =>
                    changeEstado(estado)
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
                  date={data}
                  onDateChange={() => changeDate()}
                />
              </View>

              <TouchableOpacity
                style={styles.buttonModal}
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
    </ScrollView>
  );
};

export default VacunasScreen;


