import React, { useState, useEffect } from "react";
import {
  Picker,
  Alert,
  TextInput,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  Button,
  YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesEstaturaScreen";


//VISTA HOME PRINCIPAL
const EstaturaScreen = ({ route, navigation }) => {
  LayoutAnimation.easeInEaseOut();

  const [estatura, setEstatura] = useState([]);
  const [data, setData] = useState("");
  const [estatura1, setEstatura1] = useState({});
  const [estaturaRegister, setEstaturaRegister] = useState([]);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [childUsers, setChildUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const changeEstatura = (estatura) => {
    setEstatura(estatura);
  }

  const changeDate = (valor) => {
    setData(valor);
  };

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { idPesos } = route.params;
    const { uid } = firebase.auth().currentUser;
    setEstatura1(idPesos);
    estaturas(uid, idPesos.id);
  }, []);

  const estaturas = async (uid, childId) => {
    const arrayEstatura = [];
    const querySnapshot = firebase
      .firestore()
      .collection("categories")
      .doc("estatura")
      .collection("records")
      .where("userId", "==", uid)
      .where("childId", "==", childId);
    const estaturaId = await querySnapshot.get();
    estaturaId.forEach((doc) => {
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
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <TouchableOpacity
        onPress={() => navigation.navigate("Nino")}
      >
        <Text
          style={styles.breadcrumb}
        >
          {"< Infomación < Estatura"}{" "}
        </Text>
      </TouchableOpacity>

      <View
        style={styles.containerFeEs}
      >
        <Text style={styles.whiteColor}>Fecha</Text>
        <Text style={styles.whiteColor}>Estatura</Text>
      </View>

      <View style={styles.containerCards}>
        {estaturaRegister.map((doc) => {
          const { date, height, id } = doc;
          return (
            <View style={styles.infoCard}>

              <Text style={styles.estatura}>{date}</Text>
              <Text style={styles.estatura}>{height} </Text>
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
        <View
          style={styles.centeredViews}
        >
          <View style={styles.modalView}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => { setModalVisible(!modalVisible) }}
            ></MaterialIcons>

            <View style={styles.form}>
              <View>
                <Text style={styles.title1}>Agregar estatura</Text>
              </View>

              <View
              style={styles.formBox}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Estatura"
                  autoCapitalize="none"
                  onChangeText={(estatura) => changeEstatura(estatura)}
                  value={estatura}
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
                <Text style={styles.textAgregar}>
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
};

export default EstaturaScreen;

