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
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesEstaturaScreen";

//VISTA HOME PRINCIPAL
const EstaturaScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [estatura, setEstatura] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [childId, setChildId] = useState("");
  const [userId, setUserId] = useState("");
  const [estaturaRegister, setEstaturaRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const changeEstatura = (estatura) => {
    setEstatura(estatura);
  };

  useEffect(() => {
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setChildId(idPesos.id);
    setUserId(uid);
    getDataHeight(uid, idPesos.id);
  }, []);

  const getDataHeight = async (uid, childId) => {
    const querySnapshot = firebase
      .firestore()
      .collection("categories")
      .doc("estatura")
      .collection("records")
      .where("userId", "==", uid)
      .where("childId", "==", childId);

    querySnapshot.onSnapshot((querySnapshot) => {
      const arrayEstatura = [];
      querySnapshot.forEach((doc) => {
        const { date } = doc.data();
        const formatoFecha = moment(date.toDate()).format("LL");
        arrayEstatura.push({
          ...doc.data(),
          date: formatoFecha,
          id: doc.id,
        });
      });

      if (arrayEstatura.length > 0) {
        setEstaturaRegister(arrayEstatura);
      }
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

  const handleOnChange = () => {
    if (selectDate && estatura !== "") {
      let now = new Date(date);
      const documentChildHeight = {
        childId,
        date: firebase.firestore.Timestamp.fromDate(now),
        userId,
        height: parseInt(estatura),
      };
      handleAddHeight(documentChildHeight);
    } else {
      alert("Llene todo los campos");
    }
  };

  const handleAddHeight = (documentChildHeight) => {
    const ref = firebase
      .firestore()
      .collection("categories")
      .doc("estatura")
      .collection("records");
    ref
      .add(documentChildHeight)
      .then((docRef) => {
        const { id } = docRef;
        setModalVisible(false);
        setEstatura("");
        setSelectDate(false);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Nino")}
      >
        <Text
          style={styles.breadcrumb}
        >
          {"< Infomación < Estatura"}{" "}
        </Text>
      </TouchableOpacity> */}

      <View style={styles.boxTitle}>
        <Text style={styles.textWhite}>Fecha</Text>
        <Text style={styles.textWhite}>Estatura</Text>
      </View>

      <View style={styles.containerCards}>
        {estaturaRegister.map((doc) => {
          const { date, height, id } = doc;
          return (
            <View style={styles.boxHeight}>
              <Text>{date}</Text>
              <Text>{height} </Text>
            </View>
          );
        })}
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textButton}>+ Agregue nueva medida</Text>
        </TouchableOpacity>
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
            ></MaterialIcons>

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Estatura</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Estatura"
                  autoCapitalize="none"
                  onChangeText={(estatura) => changeEstatura(estatura)}
                  value={estatura}
                ></TextInput>
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
                    <Button onPress={showDatepicker} title="Fecha" />
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
                onPress={() => handleOnChange()}
              >
                <Text style={styles.textAgregar}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EstaturaScreen;
