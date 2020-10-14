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
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesPesoScreen";


//VISTA HOME PRINCIPAL
const PesoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [peso, setPeso] = useState('');
  const [weightRegister, setWeightRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [childId, setChildId] = useState('');
  const [userId, setUserId] = useState('');

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
        <Text style={styles.textWhite}>Peso</Text>
      </View>

      <View style={styles.containerCards}>
        {weightRegister.map((doc) => {
          const { date, weight } = doc;
          return (
            <View style={styles.boxWeight}>
              <Text>{date}</Text>
              <Text>{weight} </Text>
            </View>
          )
        }
        )}
      </View>

      <View>

        <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true) }}>
          <Text style={styles.textButton}>
            + Agregue nueva medida
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
                <Text style={styles.title1}>Peso</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Peso"
                  autoCapitalize="none"
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
                    <Button
                      onPress={showDatepicker}
                      title="Fecha"
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