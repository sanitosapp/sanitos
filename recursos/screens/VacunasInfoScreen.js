import React, { useState, useEffect } from "react";
import {
  Picker,
  Modal,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  YellowBox,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../utils/firebase";
import styles from "../styles/stylesVacunasInfoScreen";
import moment from "moment";
import "moment/locale/es";
import { saveReminders } from "../hooks/firebase";

//VISTA INFORMACION DE CADA VACUNA
const VacunasInfoScreen = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [estado, setEstado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [vacunaInfo, setVacunaInfo] = useState({});
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState("date");
  const [childId, setChildId] = useState("");
  const [userId, setUserId] = useState("");
  const [labelDate, setLabelDate] = useState("Fecha de vacuna");
  const [isEnabled, setIsEnabled] = useState(false);
  const [child, setChild] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { vacunaId, childId, uid, nameUser, nameChild } = route.params;
    setChildId(childId);
    setUserId(uid);
    setChild(nameChild);
    setUser(nameUser);
    setVacunaInfo(vacunaId);
    setEstado(vacunaId.state);
  }, []);

  const changeEstado = (estado) => {
    setEstado(estado);
  };

  const onChange = (event, selectedDate) => {
    const dateFormat = moment(selectedDate).format("DD/MM/YY");
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setLabelDate(dateFormat);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setSelectDate(true);
    showMode("date");
  };

   //FUNCION PARA RECORDATORIO NOTIFICACIONES VACUNA
  const handleOnChange = async () => {
    if (selectDate && estado !== null) {
      let now = new Date(date);
      const currentDate = moment(new Date());

      let firstReminder = {
        date: null,
        days: 15,
      };

      let SecondReminder = {
        date: null,
        days: 7,
      };

      let thirdReminder = {
        date: null,
        days: 3,
      };

      let fourthReminder = {
        date: null,
        days: 1,
      };
      if (isEnabled) {
        const differenceDates = moment(now).diff(currentDate, "days");
        if (differenceDates > 14) {
          firstReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(15, "d"))
          );
          SecondReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(7, "d"))
          );
          thirdReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(3, "d"))
          );
          fourthReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(1, "d"))
          );
        } else if (differenceDates > 6) {
          SecondReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(7, "d"))
          );
          thirdReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(3, "d"))
          );
          fourthReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(1, "d"))
          );
        } else if (differenceDates > 2) {
          thirdReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(3, "d"))
          );
          fourthReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(1, "d"))
          );
        } else if (differenceDates > 0) {
          fourthReminder.date = firebase.firestore.Timestamp.fromDate(
            new Date(moment(now).subtract(1, "d"))
          );
        }
      }

      const documentVaccine = {
        vacunaInfo,
        childId,
        userId,
        date: firebase.firestore.Timestamp.fromDate(now),
        state: estado,
        reminder: isEnabled,
        firstReminder,
        SecondReminder,
        thirdReminder,
        fourthReminder,
        child,
        user,
      };

      await saveReminders(documentVaccine);
      setModalVisible(false);
      navigation.navigate("Vacunas");
    } else {
      alert("Llene todo los campos");
    }
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.targetVacunas}>
          <View style={styles.targetTitle}>
            <Text style={styles.titleStyle}>{vacunaInfo.vaccine}</Text>
          </View>
          <View style={styles.paddingCard}>
            <Text style={styles.textVacuna}><Text style={styles.negrita}>Tiempo de aplicación:</Text> {vacunaInfo.time}</Text>
            <Text style={styles.textVacuna}>
            <Text style={styles.negrita}>Dosis o refuerzo:</Text> {vacunaInfo.dose === "no tiene" ? null : vacunaInfo.dose}
              {vacunaInfo.reinforcement === "no tiene"
                ? null
                : vacunaInfo.reinforcement}{" "}
            </Text>

            <Text style={{ ...styles.textVacuna }}>
            <Text style={styles.negrita}>Estado: </Text>{vacunaInfo.state ? "Vacuna aplicada" : "Vacuna pendiente"}
            </Text>
            <View style={styles.containerStateVaccine}>
              {vacunaInfo.reminder ? (
                <View>
                  <Text style={{ ...styles.textVacuna, fontWeight: "bold" }}>
                    Vacuna Programada
                  </Text>

                  <Text style={{ ...styles.textVacuna, fontWeight: "bold" }}>
                    {vacunaInfo.date}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.infovacuna}>
          <View>
            <Text style={styles.justificada}><Text style={styles.negrita}>Información:</Text> {vacunaInfo.information}</Text>
          </View>
          <View>
            <Text style={styles.justificada}><Text style={styles.negrita}>Administración:</Text> {vacunaInfo.administration}</Text>
          </View>
          <View>
            <Text style={styles.justificada}><Text style={styles.negrita}>Efectos adversos:</Text> {vacunaInfo.effect}</Text>
          </View>
        </View>

        {!vacunaInfo.state ? (
          <TouchableOpacity
            style={styles.buttonVacuna}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textButtonVacuna}>Programar vacuna</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonVacuna}>
            <Text style={styles.textButtonVacuna}>
              Esta vacuna ya fue aplicada
            </Text>
          </TouchableOpacity>
        )}

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredViews}>
            <View style={styles.modalView}>
              <MaterialIcons
                name="close"
                size={24}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.iconBox}
              />

              <View>
                <View>
                  <Text style={styles.titleModal}>Agregar vacuna</Text>
                </View>

                <View style={styles.pickerBox}>
                  <Picker
                    style={styles.picker}
                    selectedValue={estado}
                    onValueChange={(estado, itemIndex) => changeEstado(estado)}
                  >
                    <Picker.Item label="Estado" value="0" />
                    <Picker.Item label="Aplicada" value={true} />
                    <Picker.Item label="Pendiente" value={false} />
                  </Picker>
                </View>

                <View>
                  <View>
                    <TouchableOpacity
                      onPress={showDatepicker}
                      style={styles.inputDate}
                    >
                      <Text style={styles.textAgregar1}>{labelDate}</Text>
                    </TouchableOpacity>

                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                  {estado === false ? (
                    <View style={styles.containerSwitch}>
                      <Text style={{ marginTop: "1%", color:"#B0B0B0", fontSize:14 }}>
                        Activar notificaciones
                      </Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#1D96A3" }}
                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                      
                    </View>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => handleOnChange()}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                    Agregar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default VacunasInfoScreen;
