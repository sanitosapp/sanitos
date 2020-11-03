import React, { useState, useEffect } from "react";
import {
  Picker,
  TextInput,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  YellowBox,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesHomeScreen";
import CardChildUsers from "./components/cardChildUsers";
import { newbornVaccines, vaccines } from "./utils/const";
import { saveRemindersNewborn } from "./hooks/firebase";
//VISTA HOME PRINCIPAL
const HomeScreen = ({ navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [sangre, setSangre] = useState("");
  const [childUsers, setChildUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [uidUser, setUidUser] = useState("");
  const [labelDate, setLabelDate] = useState("Fecha de nacimiento");
  const [nameUser, setNameUser] = useState("");
  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, uid, displayName } = firebase.auth().currentUser;
    getData(uid);
    setEmail(email);
    setUidUser(uid);
    setNameUser(displayName);
  }, []);

  const getData = async (uid) => {
    const querySnapshot = firebase
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .collection("childUsers");
    querySnapshot.onSnapshot((querySnapshot) => {
      var children = [];
      querySnapshot.forEach((doc) => {
        const { birthday } = doc.data();
        const formatoFecha = moment(birthday.toDate()).format("LL");
        children.push({
          ...doc.data(),
          birthday: formatoFecha,
          id: doc.id,
        });
      });

      if (children.length > 0) {
        setChildUsers(children);
      }
    });
  };

  const changeName = (name) => {
    setName(name);
  };

  const buttonPressed = () => {
    if (selectDate && name !== "" && gender !== "" && sangre !== "") {
      let now = new Date(date);

      const documentChildUser = {
        birthday: firebase.firestore.Timestamp.fromDate(now),
        bloodType: sangre,
        gender,
        name,
      };
      handleAddChildUser(documentChildUser, now);
    } else {
      alert("Llene todo los campos");
    }
  };

  const handleSaveReminders = async (
    firstReminder,
    SecondReminder,
    thirdReminder,
    fourthReminder,
    childId,
    vaccine,
    idVaccine,
    vaccinationDate
  ) => {
    const ArrayRecordatorios = [
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(firstReminder)),
        days: 15,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(SecondReminder)),
        days: 7,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(thirdReminder)),
        days: 3,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(fourthReminder)),
        days: 1,
      },
    ];

    const doc = {
      ArrayRecordatorios,
      childId: childId,
      userId: uidUser,
      child: name,
      user: nameUser,
      vaccine,
      stateReminder: true,
      idVaccine,
      vaccinationDate: firebase.firestore.Timestamp.fromDate(
        new Date(vaccinationDate)
      ),
    };

    await saveRemindersNewborn(doc);

    setName("");
    setGender("");
    setSangre("");
    setLabelDate("Fecha de nacimiento");
    setSelectDate(false);
  };

  const handleReminders = (idChild, vacuna, now, idVaccine) => {
    const { days, vaccine } = vacuna;
    const vaccinationDate = moment(now).add(days - 1, "d");
    const vaccinationDateRemider = moment(now).add(days, "d");
    const firstReminder = moment(vaccinationDateRemider).subtract(15, "d");
    const SecondReminder = moment(vaccinationDateRemider).subtract(7, "d");
    const thirdReminder = moment(vaccinationDateRemider).subtract(3, "d");
    const fourthReminder = moment(vaccinationDateRemider).subtract(1, "d");
    handleSaveReminders(
      firstReminder,
      SecondReminder,
      thirdReminder,
      fourthReminder,
      idChild,
      vaccine,
      idVaccine,
      vaccinationDate
    );
  };
  const handleAddChildUser = (documentChildUser, now) => {
    const ref = firebase
      .firestore()
      .collection("usuarios")
      .doc(uidUser)
      .collection("childUsers");

    ref
      .add(documentChildUser)
      .then((docRef) => {
        const { id } = docRef;
        setModalVisible(false);
        handleAddVaccines(ref, id, now);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  const handleAddVaccines = (ref, id, now) => {
    const refChild = ref.doc(id).collection("vacunas");
    const ChildId = id;
    const vaccinesArray = newbornVaccines();
    const arrayUserVaccines = vaccines();
    const formatToday = new Date();
    const serverDate = moment(formatToday).format("L");
    const nowDate = moment(now).format("L");
    var x = moment(nowDate, "DD-MM-YYYY");
    const comparisonDates = x.isAfter(moment(serverDate, "DD-MM-YYYY"));
    if (comparisonDates) {
      vaccinesArray.forEach((Element) => {
        refChild
          .add(Element)
          .then((docRef) => {
            const { id } = docRef;
            handleReminders(ChildId, Element, now, id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
    } else {
      arrayUserVaccines.forEach((Element) => {
        refChild
          .add(Element)
          .then((docRef) => {
            const { id } = docRef;
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.textWelcome}>
        Bienvenida {email} !{"\n"}
        Estamos felices de verte por aquí
      </Text>
      <View style={styles.containerCards}>
        <CardChildUsers childUsers={childUsers} navigation={navigation} />

        <View style={styles.infoCard1}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textAgregar}>
              {" "}
              + Agregue los datos de su niño/niña{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
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
                <Text style={styles.titleModal}>Agregar niña/o</Text>
              </View>

              <View style={styles.input1}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  autoCapitalize="none"
                  onChangeText={(name) => changeName(name)}
                  value={name}
                />
              </View>

              <View style={styles.pickerBox}>
                <Picker
                  style={styles.picker}
                  selectedValue={gender}
                  onValueChange={(itemValor) => setGender(itemValor)}
                >
                  <Picker.Item label="Sexo" value="" />
                  <Picker.Item label="Niña" value="Niña" />
                  <Picker.Item label="Niño" value="Niño" />
                </Picker>
              </View>

              <View style={styles.pickerBox}>
                <Picker
                  style={styles.picker}
                  selectedValue={sangre}
                  onValueChange={(itemValor) => setSangre(itemValor)}
                >
                  <Picker.Item label="Tipo de sangre" value="" />
                  <Picker.Item label="A positivo" value="A positivo" />
                  <Picker.Item label="A negativo" value="A negativo" />
                  <Picker.Item label="B positivo" value="B positivo" />
                  <Picker.Item label="B negativo" value="B negativo" />
                  <Picker.Item label="O negativo" value="O negativo" />
                  <Picker.Item label="O negativo" value="O negativo" />
                  <Picker.Item label="AB positivo" value="AB positivo" />
                  <Picker.Item label="AB negativo" value="AB negativo" />
                </Picker>
              </View>

              <View>
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
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => buttonPressed()}
              >
                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                  Agregar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;
