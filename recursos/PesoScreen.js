import React, { useState, useEffect } from "react";
import {
  Alert,
  Picker,
  TextInput,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesPesoScreen";


//VISTA HOME PRINCIPAL
const PesoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [peso, setPeso] = useState([]);
  const [peso1, setPeso1] = useState({});
  const [pesoRegister, setPesoRegister] = useState([]);
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [childUsers, setChildUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const changePeso = (peso) => {
    setPeso(peso);
  }

  const changeDate = (valor) => {
    setData(valor);
  };

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setPeso1(idPesos);
    pesos(uid, idPesos.id);
  }, []);


  const pesos = async (uid, childId) => {
    const arrayPeso = [];
    const querySnapshot = firebase
      .firestore()
      .collection("categories")
      .doc("peso")
      .collection("records")
      .where("userId", "==", uid)
      .where("childId", "==", childId);
    const pesoId = await querySnapshot.get();
    pesoId.forEach((doc) => {
      const { date } = doc.data()
      const formatoFecha = moment(date.toDate()).format('LL')
      arrayPeso.push({
        ...doc.data(),
        date: formatoFecha,
        id: doc.id
      })
    });
    if (arrayPeso.length > 0) {
      setPesoRegister(arrayPeso)
      console.log("arrayPeso", arrayPeso);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Nino")}
      >
        <Text
          style={styles.breadCrumb}
        >
          {"< Infomación < Peso"}{" "}
        </Text>
      </TouchableOpacity>

      <View
        style={styles.boxTitle}
      >
        <Text style={styles.textWhite}>Fecha</Text>
        <Text style={styles.textWhite}>Peso</Text>
      </View>

      <View style={styles.containerCards}>
        {pesoRegister.map((doc) => {
          const { date, weight, id } = doc;
          return (
            <View>

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
            {" "}
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
            ></MaterialIcons>

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Agregar peso</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Peso"
                  autoCapitalize="none"
                  onChangeText={(peso) => changePeso(peso)}
                  value={peso}
                ></TextInput>
              </View>

              <View>
                <DatePicker
                  format="DD/MM/YYYY"
                  style={styles.dateComponent}
                  date={data}
                  onDateChange={() => changeDate()}
                />

                
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => modalHandler()}
              >
                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                  Agregar
                    </Text>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default PesoScreen;