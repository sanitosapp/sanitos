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
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import "moment/locale/es";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesVacunasInfoScreen";

const VacunasInfoScreen = ({ route, navigation }) => {

    const [vacuna, setVacuna] = useState([]);
    const [vacunaEstado, setVacunaEstado] = useState([]);
    const [data, setData] = useState("");
    const [date, setDate] = useState(new Date());
    const [estado, setEstado] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [vacunaInfo, setVacunaInfo] = useState({});
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [selectDate, setSelectDate] = useState(false);

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
        <View>
            <View style={styles.boxVacunas}>
                <View style={styles.targetVacunas}>
                    <View style={styles.targetTitle}>
                        <Text style={styles.titleStyle}>{vacunaInfo.vaccine}</Text>
                    </View>
                    <View style={styles.paddingCard}>
                        <Text style={styles.textVacuna}>
                            {vacunaInfo.dose === "no tiene" ? null : vacunaInfo.dose}
                            {vacunaInfo.reinforcement === "no tiene" ? null : vacunaInfo.reinforcement}{" "}
                        </Text>
                        <Text style={styles.textVacuna}>
                            {vacunaInfo.state ? "Vacuna aplicada" : "Vacuna pendiente"}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <TouchableOpacity
                    style={styles.buttonVacuna}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.textButtonVacuna}>Programar vacuna</Text>
                </TouchableOpacity>
            </View>
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
                            style={styles.iconBox}
                        />

                        <View>
                            <View>
                                <Text style={styles.titleModal}>Agregar vacuna</Text>
                            </View>

                            <View
                                style={styles.pickerBox}
                            >
                                <Picker
                                    style={styles.picker}
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
                                <View>
                                    <TouchableOpacity
                                        onPress={showDatepicker}
                                        style={styles.inputDate}>
                                        <Text style={styles.textAgregar1}
                                        >
                                            Fecha de vacuna
                      </Text>
                                    </TouchableOpacity>


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
                            >
                                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
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