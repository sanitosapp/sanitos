<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
>
    <View style={styles.centeredViews}>
        <View style={styles.modalView}>
            <MaterialIcons
                name="close"
                size={24}
                onPress={() => {setModalVisible(!modalVisible)}}
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

            </View>
        </View>
    </View>
</Modal>