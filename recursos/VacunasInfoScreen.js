import React, { useState, useEffect } from "react";
import {
  Picker,
  Modal,
  Text,
  View,
  TouchableOpacity,
  YellowBox,
  Switch,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesVacunasInfoScreen";
import moment from "moment";
import "moment/locale/es";

const VacunasInfoScreen = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [estado, setEstado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [vacunaInfo, setVacunaInfo] = useState({});
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState("date");
  const [childId, setChildId] = useState("");
  const [userId, setUserId] = useState("");
  const [labelDate, setLabelDate] = useState("Fecha de vacuna");

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { vacunaId, childId, uid } = route.params;
    setChildId(childId);
    setUserId(uid);
    setVacunaInfo(vacunaId);
    setIsEnabled(vacunaInfo.state);
  }, []);

  const changeEstado = (estado) => {
    setEstado(estado);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onChange = (event, selectedDate) => {
    const dateFormat = moment(selectedDate).format("LL");
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

  const handleOnChange = () => {
    if (selectDate && estado !== "") {
      let now = new Date(date);
      const documentVaccine = {
        idVaccine: vacunaInfo.id,
        childId,
        userId,
        date: firebase.firestore.Timestamp.fromDate(now),
        state: estado,
      };
      console.log("documentVaccine", documentVaccine);
    } else {
      alert("Llene todo los campos");
    }
  };

  return (
    <View>
      <View style={styles.boxVacunas}>
        <View style={styles.targetVacunas}>
          <View style={styles.targetTitle}>
            <Text style={styles.titleStyle}>{vacunaInfo.vaccine}</Text>
          </View>
          <View style={styles.paddingCard}>
            <Text style={styles.textVacuna}>{vacunaInfo.time}</Text>
            <Text style={styles.textVacuna}>
              {vacunaInfo.dose === "no tiene" ? null : vacunaInfo.dose}
              {vacunaInfo.reinforcement === "no tiene"
                ? null
                : vacunaInfo.reinforcement}{" "}
            </Text>
            <View style={styles.containerStateVaccine}>
              <Text style={{ ...styles.textVacuna, fontWeight: "bold" }}>
                {isEnabled ? "Vacuna aplicada" : "Vacuna pendiente"}
              </Text>
              <View style={styles.container}>
                <Switch
                  trackColor={{ false: "#767577", true: "#1D96A3" }}
                  thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.textVacuna}>{vacunaInfo.diseases}</Text>
          </View>
          <View>
            <Text style={styles.textVacuna}>{vacunaInfo.administration}</Text>
          </View>
          <View>
            <Text style={styles.textVacuna}>{vacunaInfo.vaccinebrands}</Text>
          </View>
          <View>
            <Text style={styles.textVacuna}>{vacunaInfo.effect}</Text>
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
    </View>
  );
};

export default VacunasInfoScreen;
