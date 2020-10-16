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
  Button
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesPesoScreen";


//VISTA HOME PRINCIPAL
const PesoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [peso, setPeso] = useState('');
  const [weightRegister, setWeightRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleChange, setModalVisibleChange] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [childId, setChildId] = useState('');
  const [userId, setUserId] = useState('');
  const [time, setTime] = useState(new Date());


  const changePeso = (peso) => {
    setPeso(peso);
  }

  useEffect(() => {
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setChildId(idPesos.id)
    setUserId(uid)
    getDataWeight(uid, idPesos.id);
  }, []);


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
        const { date } = doc.data()
        const formatoFecha = moment(date.toDate()).format('LL')
        arrayPeso.push({
          ...doc.data(),
          date: formatoFecha,
          id: doc.id
        })
      });

      if (arrayPeso.length > 0) {
        setWeightRegister(arrayPeso)
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
    if (selectDate && peso !== "") {
      let now = new Date(date);
      const documentChildWeight = {
        childId,
        date: firebase.firestore.Timestamp.fromDate(now),
        userId,
        weight: parseInt(peso)
      };
      handleAddWeight(documentChildWeight)
    } else {
      alert("Llene todo los campos");
    }
  };



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
        console.log("adding document: ", id)
        setModalVisible(false);
        setPeso('');
        setSelectDate(false);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Nino")}
      >
        <Text
          style={styles.breadCrumb}
        >
          {"< Infomación < Peso"}{" "}
        </Text> 
      </TouchableOpacity>*/}

      <View
        style={styles.boxTitle}
      >
        <Text style={styles.textWhite}>Fecha</Text>
        <Text style={styles.textWhite}>Peso(kg) </Text>
      </View>

      <View style={styles.containerCards}>
        {weightRegister.map((doc) => {
          const { date, weight } = doc;
          return (
            <View style={styles.boxWeight}>
              <Text>{date}</Text>
              <Text>{weight} </Text>
              <TouchableOpacity onPress={() => { setModalVisibleChange(true) }}><Feather name="edit" size={24} color="black" /></TouchableOpacity>
            </View>
          )
        }
        )}
      </View>

      <View>

        <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true) }}>
          <Text style={styles.textButton}>
            + Agregar peso
            </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredViews}>
          <View
            style={styles.modalView}
          >
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => { setModalVisible(!modalVisible) }}
              style={styles.iconBox}
            />

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Peso </Text>
              </View> 

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Peso (kg) "
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  maxLength={6}
                  onChangeText={(peso) => changePeso(peso)}
                  value={peso}
                />
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
                    <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.inputBirthday}>
                    <Text style={styles.textAgregar1}
                    >
                      {formatDate(date)}

                    </Text>
                  </TouchableOpacity>
                    
                  </View>

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

      {/* MODAL DE CAMBIAR INFO */}
      <Modal visible={modalVisibleChange} transparent={true} animationType="fade">
        <View style={styles.centeredViews}>
          <View
            style={styles.modalView}
          >
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => { setModalVisibleChange(!modalVisibleChange) }}
              style={styles.iconBox}
            />

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Modificar peso </Text>
              </View> 

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Peso (kg) "
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  maxLength={6}
                  onChangeText={(peso) => changePeso(peso)}
                  value={peso}
                />
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
                    <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.inputBirthday}>
                    <Text style={styles.textAgregar1}
                    >
                      {formatDate(date)}

                    </Text>
                  </TouchableOpacity>
                    
                  </View>

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
    </ScrollView>
  );
}

export default PesoScreen;