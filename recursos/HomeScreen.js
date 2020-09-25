import React, { useState, useEffect } from "react";
import {
  Alert,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
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
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "./utils/firebase";

//VISTA HOME PRINCIPAL
const HomeScreen = (props) => {
  LayoutAnimation.easeInEaseOut();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [sangre, setSangre] = useState("");
  const [data, setData] = useState("");
  const [nino, setNino] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, displayName, uid } = firebase.auth().currentUser;
    console.log(uid);
    setDisplayName(displayName);
    getData(uid);
    setEmail(email);
  }, []);

  const getData = async (uid) => {
    const querySnapshot = firebase.firestore().collection("usuarios").doc(uid);
    const user = await querySnapshot.get();
    console.log("user desde la data", user.data());
  };
  const changeName = (name) => {
    setName(name);
  };

  const changeDate = (valor) => {
    setData(valor);
  };

  const buttonPressed = () => {};

  const modalHandler = () => {
    setVisible(true);
  };

  const signOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>

      <Text style={{ marginTop: 60, left: 30, fontSize: 16 }}>
        Bienvenida {email} !{"\n"}
        Estamos felices de verte por aquí
      </Text>
      <View style={styles.containerCards}>
        <View style={styles.infoCard}>
          <View>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                backgroundColor: "#1D96A3",
                padding: 6,
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              JOrge
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../recursos/imagenes/logoSanitos.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text>hola </Text>
              <Text>hola</Text>
              <Text>hola </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("Nino")}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 6,
                  fontSize: 16,
                  color: "#C4C4C4",
                }}
              >
                {" "}
                + Presiona aqui para ver mas{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <TouchableOpacity onPress={() => modalHandler()}>
            <Text
              style={{
                textAlign: "center",
                padding: 20,
                fontSize: 16,
                color: "#C4C4C4",
              }}
            >
              {" "}
              + Agregue los datos de su niño/niña{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={false} transparent={true} animationType="fade">
        <TouchableOpacity
          onPress={() => modalHandler()}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                height: "80%",
                width: "80%",
                backgroundColor: "grey",
                padding: 10,
                borderRadius: 4,
              }}
            >
              <MaterialIcons
                name="close"
                size={24}
                onPress={() => modalHandler()}
              ></MaterialIcons>

              <View style={styles.form}>
                <View>
                  <Text style={styles.title1}>Agregar niña/a</Text>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    autoCapitalize="none"
                    onChangeText={(name) => changeName(name)}
                    value={name}
                  ></TextInput>
                </View>

                <View>
                  <Picker
                    style={styles.pickerComponent}
                    selectedValue={escolaridade}
                    onValueChange={(itemValor, itemIndex) =>
                      setEscolaridade(itemValor)
                    }
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
                    onValueChange={(itemValor, itemIndex) =>
                      setSangre(itemValor)
                    }
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
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={data}
                    onDateChange={() => changeDate()}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => buttonPressed()}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                    Agregar
                  </Text>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#05A4AC",
    borderRadius: 4,
    width: "85%",
  },
  containerCards: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E9446A",
    borderRadius: 4,

    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
