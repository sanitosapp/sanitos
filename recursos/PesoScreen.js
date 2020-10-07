import React, { useState, useEffect } from "react";
import {
  Alert,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
  Modal,
  YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesPesoScreen";


//VISTA HOME PRINCIPAL
const PesoScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [peso, setPeso] = useState("");
  const [pesoId, setPesoId] = useState([]);
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [childUsers, setChildUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { idPeso } = route.params;

  const changePeso = (peso) => {
    setPeso(peso);
  }

  const changeDate = (valor) => {
    setData(valor);
  };

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, displayName, uid } = firebase.auth().currentUser;
    console.log(uid);
    setDisplayName(displayName);
    getData(uid);
    pesos(idPeso);
    setEmail(email);
  }, []);

  const getData = async (uid) => {
    const querySnapshot = firebase.firestore().collection("usuarios").doc(uid).collection('childUsers');
    const childUsers = await querySnapshot.get();
    const children = []
    childUsers.forEach((doc) => {
      const { birthday } = doc.data()
      const formatoFecha = moment(birthday.toDate()).format('LL')
      children.push({
        ...doc.data(),
        birthday: formatoFecha,
        id: doc.id
      })
    });
    if (children.length > 0) {

      setChildUsers(children)
    }
  };

  const pesos = async (idPeso) => {
    const arrayPeso = [];
    const querySnapshot = firebase
      .firestore()
      .collection("categories")
      .doc("peso")
      .collection("records")
      .where("userId", "==", uid)
      .where("childId", "==", idPeso);
    const pesoId = await querySnapshot.get();
    pesoId.forEach((doc) => {
      arrayPeso.push({ id: doc.id, ...doc.data() });
    });
    if (arrayPeso.length > 0) {
      setPesoId(arrayPeso)
      console.log("arrayPeso", arrayPeso);
    }
  };

  /* const buttonPressed = () => {
    const arrayDataNino = [];
    if (this.state.peso && this.state.data) {
      const dataNino = {
        peso: this.state.peso,
        data: this.state.data,
      };
      arrayDataNino.push(dataNino);
      try {
        AsyncStorage.getItem("database_peso").then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(dataNino);
            AsyncStorage.setItem("database_peso", JSON.stringify(d)).then(
              () => {
                this.modalHandler();
              }
            );
          } else {
            AsyncStorage.setItem(
              "database_peso",
              JSON.stringify(arrayDataNino)
            ).then(() => {
              this.modalHandler();
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert("Falta completar un campo");
    }
  } */

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

      <Text>idPeso: {JSON.stringify(idPeso)}</Text>

      <View style={styles.containerCards}>
        {pesoId.map((doc) => {
            const { date, weight, id } = doc;
            return (
              <View>
              
                <Text>{date}{weight}{id} </Text>
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