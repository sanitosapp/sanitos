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
import { firebase } from "../utils/firebase";
import styles from "../styles/stylesVacunasScreen";

//VISTA VACUNAS
const VacunasScreen = ({ route, navigation }) => {
  const [dataVacuna, setDataVacuna] = useState([]);
  const [vacunaEstado, setVacunaEstado] = useState([]);
  const [data, setData] = useState("");
  const [estado, setEstado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeAll, setActiveAll] = useState(true);
  const [activeSlopes, setActiveSlopes] = useState(false);
  const [activeApplied, setActiveApplied] = useState(false);
  const [vacunaApplied, setVacunaApplied] = useState(false);
  const [uid, setUid] = useState("");
  const [childId, setChildId] = useState("");
  const [nameChild, setNameChild] = useState("");
  const [nameUser, setNameUser] = useState("");
  const changeEstado = (estado) => {
    setEstado(estado);
  };

  const changeDate = (valor) => {
    setData(valor);
  };

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { idPesos } = route.params;
    const { uid, displayName } = firebase.auth().currentUser;
    setUid(uid);
    setChildId(idPesos.id);
    setNameChild(idPesos.name);
    setNameUser(displayName);
    vacunas(uid, idPesos.id);
  }, []);

  //FUNCION OBTENER DATOS DE FIRESTORE
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
        const { date } = doc.data();
        const formatoFecha =
          date !== "" && date !== null
            ? moment(date.toDate()).format("LL")
            : date;

        arrayVacunas.push({
          ...doc.data(),
          id: doc.id,
          date: formatoFecha,
        });
      });
      if (arrayVacunas.length > 0) {
        setVacunaEstado(arrayVacunas);
        setDataVacuna(arrayVacunas);
      }
    });
  };

  //FUNCION PARA FILTRAR VACUNAS POR ESTADO PENDIENTE
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

  //FUNCION PARA FILTRAR VACUNAS POR ESTADO APLICADA
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

  //FUNCION PARA FILTRAR  TODAS LAS VACUNAS
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
        const { dose, state, vaccine, reinforcement, time, administration, effect, date, information } = doc;
        return (
          <View style={styles.boxVacunas} key={index}>
            <TouchableOpacity
              style={{ width: "85%" }}
              onPress={() => {
                navigation.navigate("VacunasInfo", {
                  vacunaId: doc,
                  uid,
                  childId,
                  nameUser,
                  nameChild,
                });
              }}
            >
              <View style={styles.targetVacunas}>
                <View style={styles.targetTitle}>
                  <Text style={styles.titleStyle}>{vaccine} </Text>
                </View>
                <View style={styles.paddingCard}>
                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={styles.textVacuna}>{time}</Text>
                    <Text style={styles.textVacuna}>
                      {dose === "no tiene" ? null : dose}
                      {reinforcement === "no tiene" ? null : reinforcement}{" "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent:"space-around"  }}>
                    <Text 
                    style={state === "Vacuna aplicada" ? styles.vacunaAplicada: styles.vacunaPendiente}
                    >
                      {state ? "Vacuna aplicada" : "Vacuna pendiente"}
                    </Text>
                  </View>
                </View>
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
