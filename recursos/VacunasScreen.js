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
import moment from "moment";
import "moment/locale/es";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesVacunasScreen";

//VISTA HOME PRINCIPAL
const VacunasScreen = ({ route, navigation }) => {
  const [dataVacuna, setDataVacuna] = useState([]);
  const [vacunaEstado, setVacunaEstado] = useState([]);
  const [data, setData] = useState("");
  const [estado, setEstado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeAll, setActiveAll] = useState(true);
  const [activeSlopes, setActiveSlopes] = useState(false);
  const [activeApplied, setActiveApplied] = useState(false);

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
    vacunas(uid, idPesos.id);
  }, []);

  const vacunas = async (uid, childId) => {
    const querySnapshot = firebase
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .collection("childUsers")
      .doc(childId)
      .collection("vacunas");
    querySnapshot.onSnapshot((querySnapshot) => {
      const arrayVacunas = [];
      querySnapshot.forEach((doc) => {
        arrayVacunas.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (arrayVacunas.length > 0) {
        setVacunaEstado(arrayVacunas);
        setDataVacuna(arrayVacunas);
      }
    });

  };

  const filterVaccinesPending = () => {
    const ArrayVaccinesPending = [];
    dataVacuna.forEach((element) => {
      const { state } = element;
      if (!state) {
        ArrayVaccinesPending.push({ ...element });
      }
    });
    setVacunaEstado(ArrayVaccinesPending);
    setActiveAll(false);
    setActiveSlopes(true);
    setActiveApplied(false);
  };

  const filterVaccinesApplied = () => {
    const ArrayVaccinesApplied = [];
    dataVacuna.forEach((element) => {
      const { state } = element;
      if (state) {
        ArrayVaccinesApplied.push({ ...element });
      }
    });
    setVacunaEstado(ArrayVaccinesApplied);
    setActiveAll(false);
    setActiveSlopes(false);
    setActiveApplied(true);
  };

  const filterVaccinesAll = () => {
    const ArrayVaccinesAll = [];
    dataVacuna.forEach((element) => {
      ArrayVaccinesAll.push({ ...element });
    });
    setVacunaEstado(ArrayVaccinesAll);
    setActiveAll(true);
    setActiveSlopes(false);
    setActiveApplied(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={activeAll ? styles.buttonActive : styles.button}
          onPress={filterVaccinesAll}
        >
          <Text style={styles.titleBtnFilter}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeSlopes ? styles.buttonActive : styles.button}
          onPress={filterVaccinesPending}
        >
          <Text style={styles.titleBtnFilter}>Vacunas pendientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeApplied ? styles.buttonActive : styles.button}
          onPress={filterVaccinesApplied}
        >
          <Text style={styles.titleBtnFilter}>Vacunas aplicadas</Text>
        </TouchableOpacity>
      </View>

      {vacunaEstado.map((doc, index) => {
        const { dose, state, vaccine, reinforcement, time, diseases, administration, vaccinebrands, effect, date } = doc;
        return (
          <View style={styles.boxVacunas} key={index}>
            <TouchableOpacity
              style={{ width: "85%" }}
              onPress={() => {
                navigation.navigate("VacunasInfo", { vacunaId: doc });
              }}
            >
              <View style={styles.targetVacunas}>
                <View style={styles.targetTitle}>
                  <Text style={styles.titleStyle}>{vaccine} </Text>
                </View>
                <View style={styles.paddingCard}>
                <View>

                </View>
                <View>
                  
                </View>
                  <Text style={styles.textVacuna}>
                    {time}
                  </Text>
                  <Text style={styles.textVacuna}>
                    {dose === "no tiene" ? null : dose}
                    {reinforcement === "no tiene" ? null : reinforcement}{" "}
                  </Text>
                  <Text style={styles.textVacuna}>
                    {state ? "Vacuna aplicada" : "Vacuna pendiente"}
                  </Text>
                </View>

                {/* <TouchableOpacity
                  onPress={() => { setModalVisible(true) }}
                  style={styles.col3}
                >
                  <MaterialIcons name="add" size={20} color="black" />
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          </View>
        );
      })}

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredViews}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            ></MaterialIcons>

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Agregar vacuna</Text>
              </View>

              <View style={styles.formBox}>
                <Picker
                  style={styles.pickerComponent}
                  selectedValue={estado}
                  onValueChange={(estado, itemIndex) => changeEstado(estado)}
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

              <TouchableOpacity style={styles.buttonModal}>
                <Text style={styles.textAgregar}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View></View>
    </ScrollView>
  );
};

export default VacunasScreen;
