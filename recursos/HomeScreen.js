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
      alert("Llene todo los campos");
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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

        <View style={styles.infoCard}>
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

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Agregar niña/o</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  autoCapitalize="none"
                  onChangeText={(name) => changeName(name)}
                  value={name}
                />
              </View>

              <View>
                <Picker
                  style={styles.pickerComponent}
                  selectedValue={gender}
                  onValueChange={(itemValor) => setGender(itemValor)}
                >
                  <Picker.Item label="Sexo" value="" />
                  <Picker.Item label="Niña" value="Niña" />
                  <Picker.Item label="Niño" value="Niño" />
                </Picker>
              </View>

              <View>
                <Picker
                  style={styles.pickerComponent}
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
                  <View
                    style={{
                      color: "#ffffff",
                      fontWeight: "500",
                      marginTop: 10,
                    }}
                  >
                    <Button
                      onPress={showDatepicker}
                      title="fecha de nacimiento"
                    />
                  </View>

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
                  AGREGAR
                </Text>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;
