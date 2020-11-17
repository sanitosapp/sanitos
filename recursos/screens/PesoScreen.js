import React, { useState, useEffect } from "react";
import {
  TextInput,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../utils/firebase";
import styles from "../styles/stylesPesoScreen";
import AwesomeAlert from "react-native-awesome-alerts";
import NumericInput from "@wwdrew/react-native-numeric-textinput";

//VISTA PESO
const PesoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [peso, setPeso] = useState("");
  const [weightRegister, setWeightRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleChange, setModalVisibleChange] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateUpdate, setDateUpdate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [childId, setChildId] = useState("");
  const [userId, setUserId] = useState("");
  const [time, setTime] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [labelDate, setLabelDate] = useState("Seleccione fecha");
  const [registroActivoActualizar, setRegistroActivoActualizar] = useState({
    date: "",
    weight: "",
    id: "",
  });

  const changePeso = (peso) => {
    setPeso(peso);
  };

  useEffect(() => {
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setChildId(idPesos.id);
    setUserId(uid);
    getDataWeight(uid, idPesos.id);
  }, []);

  //FUNCION PARA OBTENER LOS DATOS DE FIRESTORE
  const getDataWeight = async (uid, childId) => {
    const querySnapshot = firebase
      .firestore()
      .collection("categories")
      .doc("peso")
      .collection("records")
      .where("userId", "==", uid)
      .where("childId", "==", childId);

    querySnapshot.onSnapshot((querySnapshot) => {
      const arrayPeso = [];
      querySnapshot.forEach((doc) => {
        const { date } = doc.data();
        const formatoFecha = moment(date.toDate()).format("DD/MM/YY");
        arrayPeso.push({
          ...doc.data(),
          date: formatoFecha,
          id: doc.id,
          toDate: new Date(date.toDate()),
        });
      });

      if (arrayPeso.length > 0) {
        setWeightRegister(arrayPeso);
      }
    });
  };

  //FUNCION PARA AGREGAR FECHA
  const onChange = (event, selectedDate) => {
    const dateFormat = moment(selectedDate).format("DD/MM/YY");
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setLabelDate(dateFormat);
      setShow(Platform.OS === "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  //FUNCION PARA EDITAR FECHA
  const onChangeUpdate = (event, selectedDate) => {
    const dateFormat = moment(selectedDate).format("DD/MM/YY");
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedDate || date;
      setDateUpdate(currentDate);
      setLabelDate(dateFormat);
      setShow(Platform.OS === "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setSelectDate(true);
    showMode("date");
  };

  //FUNCION QUE AGREGA PESO Y FECHA 1
  const handleOnChange = () => {
    if (selectDate && peso !== "") {
      let now = new Date(date);
      const documentChildWeight = {
        childId,
        date: firebase.firestore.Timestamp.fromDate(now),
        userId,
        weight: parseFloat(peso),
      };
      handleAddWeight(documentChildWeight);
    } else {
      setShowAlert(true);
    }
  };

  //FUNCION QUE EDITA PESO Y FECHA 1
  const handleOnChangeEdit = () => {
    if (registroActivoActualizar.weight !== "") {
      let now = new Date(dateUpdate);
      const documentChildWeight = {
        childId,
        date: firebase.firestore.Timestamp.fromDate(now),
        userId,
        weight: parseFloat(registroActivoActualizar.weight),
      };
      handleEditWeight(documentChildWeight);
    } else {
      setShowAlert(true);
    }
  };

  //FUNCION QUE AGREGA PESO
  const handleAddWeight = (documentChildWeight) => {
    const ref = firebase
      .firestore()
      .collection("categories")
      .doc("peso")
      .collection("records");
    ref
      .add(documentChildWeight)
      .then((docRef) => {
        const { id } = docRef;
        setModalVisible(false);
        setPeso("");
        setSelectDate(false);
        setLabelDate("Seleccione Fecha");
        setDate(new Date());
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  //FUNCION QUE EDITA PESO
  const handleEditWeight = (documentChildWeight) => {
    const { id } = registroActivoActualizar;
    const ref = firebase
      .firestore()
      .collection("categories")
      .doc("peso")
      .collection("records")
      .doc(id);
    ref
      .update(documentChildWeight)
      .then(() => {
        console.log("Document successfully updated!");
        setModalVisibleChange(false);
        setPeso("");
        setSelectDate(false);
        setLabelDate("seleeccione fecha");
        setDateUpdate(new Date());
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const openModal = (doc) => {
    const { toDate } = doc;
    setModalVisibleChange(true);
    setRegistroActivoActualizar(doc);
    setLabelDate(doc.date);
    setDateUpdate(toDate);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.boxTitle}>
          <Text style={styles.textWhite}>Fecha</Text>
          <Text style={styles.textWhite}>Peso(kg) </Text>
        </View>

        <View style={styles.containerCards}>
          {weightRegister.map((doc) => {
            const { date, weight } = doc;
            return (
              <View style={styles.boxWeight}>
                <Text style={styles.textPeso}>{date}</Text>
                <Text style={styles.textPeso}>{weight} kg </Text>
                <TouchableOpacity onPress={() => openModal(doc)}>
                  <Feather name="edit" size={24} color="#b0b0b0" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textButton}>+ Agregar peso</Text>
        </TouchableOpacity>

        {/* MODAL DE AGREGARRRR */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.centeredViews}>
            <View style={styles.modalView}>
              <MaterialIcons
                name="close"
                size={24}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setPeso("");
                  setSelectDate(false);
                  setLabelDate("Seleccione Fecha");
                }}
                style={styles.iconBox}
              />

              <View>
                <View>
                  <Text style={styles.titleModal}>Peso </Text>
                </View>

                <View style={styles.input1}>
                  <NumericInput
                    style={styles.input}
                    placeholder="Peso (kg)"
                    type="decimal"
                    decimalPlaces={3}
                    value={peso}
                    onUpdate={(peso) => changePeso(peso)}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.inputBirthday}
                  >
                    <Text style={styles.textAgregar1}>{labelDate}</Text>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={onChange}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => handleOnChange()}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "500" }}>Agregar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* MODAL DE EDITAR */}
        <Modal
          visible={modalVisibleChange}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.centeredViews}>
            <View style={styles.modalView}>
              <MaterialIcons
                name="close"
                size={24}
                onPress={() => {
                  setModalVisibleChange(!modalVisibleChange);
                }}
                style={styles.iconBox}
              />

              <View>
                <View>
                  <Text style={styles.titleModal}>Editar peso </Text>
                </View>

                <View style={styles.input1}>
                  <NumericInput
                    style={styles.input}
                    placeholder="Peso (kg)"
                    type="decimal"
                    decimalPlaces={3}
                    value={registroActivoActualizar.weight}
                    onUpdate={(peso) => {
                      setRegistroActivoActualizar((prevState) => ({
                        ...prevState,
                        weight: peso,
                      }));
                    }}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.inputBirthday}
                  >
                    <Text style={styles.textAgregar1}>{labelDate}</Text>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateUpdate}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeUpdate}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => handleOnChangeEdit()}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                    Actualizar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Importante"
          message="Debe llenar todos los campos para registrar peso."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="Cancelar"
          confirmText="Aceptar"
          confirmButtonColor="#C13273"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PesoScreen;
