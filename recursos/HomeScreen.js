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
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesHomeScreen";
import CardChildUsers from "./components/cardChildUsers";
import { vaccines } from "./utils/const";
import AwesomeAlert from "react-native-awesome-alerts";


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
  const [time, setTime] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, uid } = firebase.auth().currentUser;
    getData(uid);
    setEmail(email);
    setUidUser(uid);
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
        console.log("cumpleaños", birthday)
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
      handleAddChildUser(documentChildUser);
    } else {
      setShowAlert(true);
    }
  };

  const handleAddChildUser = (documentChildUser) => {
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
        setName("");
        setGender("");
        setSangre("");
        setSelectDate(false);
        handleAddVaccines(ref, id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  const handleAddVaccines = (ref, id) => {
    const refChild = ref.doc(id).collection("vacunas");
    const vaccinesArray = vaccines();
    vaccinesArray.forEach((Element) => {
      refChild
        .add(Element)
        .then((docRef) => {
          const { id } = docRef;
          console.log(" adding document: ", id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  };

  /* const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log("asaasasasasassa", selectedDate)
  }; */

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShow(Platform.OS === "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }


    console.log("asaasasasasassa", selectedDate)
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setSelectDate(true);
    showMode("date");
  };

  const formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.textWelcome}>
        !Hola!
        Gracias por estar aquí.
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
                <Text style={styles.titleModal}>Registrar niñ@</Text>
              </View>

              <View
                style={styles.input1}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Nombre*"
                  autoCapitalize="none"
                  onChangeText={(name) => changeName(name)}
                  value={name}
                />
              </View>

              <View
                style={styles.pickerBox}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={gender}
                  onValueChange={(itemValor) => setGender(itemValor)}
                >
                  <Picker.Item label="Sexo*" value="" />
                  <Picker.Item label="Niña" value="Niña" />
                  <Picker.Item label="Niño" value="Niño" />
                </Picker>
              </View>

              <View
                style={styles.pickerBox}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={sangre}
                  onValueChange={(itemValor) => setSangre(itemValor)}
                >
                  <Picker.Item label="Tipo de sangre*" value="" />
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
                    style={styles.inputBirthday}>
                    <Text style={styles.textAgregar1}
                    >
                      {formatDate(date)}*

                    </Text>
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
              </View>
              <TouchableOpacity
                style={styles.buttonFoto}
              >
                <Text style={{ color: "#B0B0B0", fontWeight: "500", textAlign:"center", textDecorationLine:"underline" }}>
                  Agregar foto
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => buttonPressed()}
              >
                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                  Registrar
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
        message="Debe llenar todos los campos para registrar a su niño."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        confirmButtonColor='#C13273'
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
