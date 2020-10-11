import React, { useState, useEffect } from "react";
import {
    Picker,
    Modal,
    ScrollView,
    Text,
    StatusBar,
    View,
    TouchableOpacity,
    YellowBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import "moment/locale/es";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesVacunasScreen";

const VacunasInfoScreen = ({ route, navigation }) => {

    const [vacuna, setVacuna] = useState([]);
    const [vacunaEstado, setVacunaEstado] = useState([]);
    const [data, setData] = useState("");
    const [estado, setEstado] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [vacunaInfo, setVacunaInfo] = useState({});

    useEffect(() => {
        YellowBox.ignoreWarnings(["Setting a timer"]);
        const { vacunaId } = route.params;
        setVacunaInfo(vacunaId);
    }, []);

    const changeEstado = (estado) => {
        setEstado(estado);
    };

    const changeDate = (valor) => {
        setData(valor);
    };
    return (
        <View>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredViews}>
                    <View style={styles.modalView}>
                        <MaterialIcons
                            name="close"
                            size={24}
                            onPress={() => { setModalVisible(!modalVisible) }}
                        ></MaterialIcons>

                        <View style={styles.form}>
                            <View>
                                <Text style={styles.title1}>Agregar vacuna</Text>
                            </View>

                            <View
                                style={styles.formBox}
                            >
                                <Picker
                                    style={styles.pickerComponent}
                                    selectedValue={estado}
                                    onValueChange={(estado, itemIndex) =>
                                        changeEstado(estado)
                                    }
                                >
                                    <Picker.Item label="Estado" value="0" />
                                    <Picker.Item label="Aplicada" value={"true"} />
                                    <Picker.Item label="Pendiente" value={"false"} />
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
                                style={styles.buttonModal}
                            >
                                <Text style={styles.textAgregar}>
                                    Agregar
                  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VacunasInfoScreen;