import React, { useState, useEffect } from "react";
import {
  Picker,
  Modal,
  ScrollView,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import "moment/locale/es";
import { firebase } from "./utils/firebase";
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



  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setVacuna(idPesos);
    vacunas(uid, idPesos.id);
  }, []);

  const vacunas = async (uid, childId) => {
    
    const arrayVacunas = [];
    const querySnapshot = firebase
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .collection("childUsers")
      .doc(childId)
      .collection("vacunas")
  
    const vacunaId = await querySnapshot.get();
    vacunaId.forEach((doc) => {
      arrayVacunas.push({
        ...doc.data(),
        id: doc.id
      })
    });
    if (arrayVacunas.length > 0) {
      setVacunaEstado(arrayVacunas)
    }
  };

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
              <View style={styles.col1}> 
                <Text style={styles.text}>{vaccine}</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.text}>{dose==="no tiene" ? null:dose}{reinforcement==="no tiene" ? null:reinforcement} </Text>
              </View>
            
                <TouchableOpacity
                  onPress={() => { setModalVisible(true) }}
                   style={styles.col3}
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


