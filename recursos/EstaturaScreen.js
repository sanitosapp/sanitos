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
import AwesomeAlert from "react-native-awesome-alerts";


//VISTA HOME PRINCIPAL
const EstaturaScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [estatura, setEstatura] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [childId, setChildId] = useState('');
  const [userId, setUserId] = useState('');
  const [estaturaRegister, setEstaturaRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);

  const changeEstatura = (estatura) => {
    setEstatura(estatura);
  }

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
        const { date } = doc.data()
        const formatoFecha = moment(date.toDate()).format('LL')
        arrayEstatura.push({
          ...doc.data(),
          date: formatoFecha,
          id: doc.id
        })
      });

      if (arrayEstatura.length > 0) {
        setEstaturaRegister(arrayEstatura)
        console.log("arrayestatura", arrayEstatura);
      }
    });
  };

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

  const formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
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
        height: parseInt(estatura)
      };
      handleAddHeight(documentChildHeight)
    } else {
      setShowAlert(true);
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
        console.log("adding document: ", id)
        setModalVisible(false);
        setEstatura('');
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

      <View
        style={styles.boxTitle}
      >
        <Text style={styles.textWhite}>Fecha</Text>
        <Text style={styles.textWhite}>Estatura(cm)</Text>
      </View>

      <View style={styles.containerCards}>
        {estaturaRegister.map((doc) => {
          const { date, height, id } = doc;
          return (
            <View style={styles.boxHeight}>

              <Text>{date}</Text>
              <Text>{height} </Text>
              <TouchableOpacity><Feather name="edit" size={24} color="#b0b0b0" /></TouchableOpacity>
            </View>
          )
        }
        )}
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true) }}>
          <Text style={styles.textButton}>
            + Agregar estatura
            </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View
          style={styles.centeredViews}
        >
          <View style={styles.modalView}>
            <MaterialIcons
              style={styles.iconBox}
              name="close"
              size={24}
              onPress={() => { setModalVisible(!modalVisible) }}
            ></MaterialIcons>

            <View>
              <View>
                <Text style={styles.titleModal}>Estatura</Text>
              </View>

              <View style={styles.input1}>
                <TextInput
                  style={styles.input}
                  placeholder="Estatura (cm)"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  maxLength={6}
                  onChangeText={(estatura) => changeEstatura(estatura)}
                  value={estatura}
                ></TextInput>
              </View>

              <View>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.inputBirthday}>
                  <Text style={styles.textAgregar1}
                  >
                    {formatDate(date)}

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
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Importante"
          message="Debe llenar todos los campos para registrar estatura."
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

export default EstaturaScreen;

