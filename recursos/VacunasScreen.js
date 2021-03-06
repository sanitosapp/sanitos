import React, { useState } from 'react'
import { TouchableWithoutFeedback, Picker, TextInput, Modal, SafeAreaView, Text, Dimensions, Image, ListUserItem, StatusBar, View, StyleSheet, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker';






//VISTA HOME PRINCIPAL
export default class VacunasScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  }

  state = {
    isDateTimePickerVisible: true,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };


  constructor() {
    super();
    this.state = {
      data: [
        {
          dosis: 'Única dosis',
          vacuna: 'BCG',
          estado: 'false'
        },
        {
          dosis: 'Única dosis',
          vacuna: 'Hepatitis B',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Pentavalente',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Polio inyección',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Rotavirus',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Neumococo',
          estado: 'false'
        },
       
        {
          dosis: '2da dosis',
          vacuna: 'Pentavalente',
          estado: 'false'
        },
        {
          dosis: '2da dosis',
          vacuna: 'Polio inyección',
          estado: 'false'
        },
        
        {
          dosis: '2da dosis',
          vacuna: 'Rotavirus',
          estado: 'false'
        },
        {
          dosis: '2da dosis',
          vacuna: 'Neumococo',
          estado: 'false'
        },
        {
          dosis: '3ra dosis',
          vacuna: 'Pentavalente',
          estado: 'false'
        },
        {
          dosis: '3ra dosis',
          vacuna: 'Polio oral',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Influenza',
          estado: 'false'
        },
        {
          dosis: '2da dosis',
          vacuna: 'Influenza estacional',
          estado: 'false'
        },
        {
          dosis: '3ra dosis',
          vacuna: 'Neumococo',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'SPR',
          estado: 'false'
        },
        {
          dosis: '1ra dosis',
          vacuna: 'Varicela',
          estado: 'false'
        },
        {
          dosis: '2da dosis',
          vacuna: 'Influenza',
          estado: 'false'
        },
        {
          dosis: 'Única dosis',
          vacuna: 'Fiebre amarilla',
          estado: 'false'
        },
        {
          dosis: '2da dosis',
          vacuna: 'SRP',
          estado: 'false'
        },
        {
          dosis: '',
          vacuna: 'DTP',
          refuerzo: '1er refuerzo',
          estado: 'false'
        },
        {
          dosis: '',
          vacuna: 'Polio oral',
          refuerzo: '1er refuerzo',
          estado: 'false'
        },
        {
          dosis: '',
          vacuna: 'DTP',
          refuerzo: '2do refuerzo',
          estado: 'false'
        },
        {
          dosis: '',
          vacuna: 'Polio oral',
          refuerzo: 'Refuerzo',
          estado: 'false'
        },
      ],
    };
  };
  /* 
    filterVacuna() {
      const newdata = this.state.data.filter((item) => {
        return item !== '1ra'
      })
      this.setState({
        data: newdata
      });
    } */

  /*  buttonPressed() {
     return (
       <View
         style={styles.infoCard}>
 
 
 
         <View
           style={{ padding: 10, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}
         >
           <Text>Neumococo</Text>
           <TouchableOpacity
             onPress={() => this.props.navigation.navigate('Nino')}
           >
             <MaterialIcons
               name='add'
               size={20}
               color='black'
             />
           </TouchableOpacity>
         </View>
 
       </View>
     )
   } */

  state = {
    data: ""
  }
  state = {
    peso: ""
  }

  
  
  

  state = {
    modalVisible: false,
    dosis: '',
    vacuna: '',
    refuerzo: '',
    estado: 'false'
  };

  setModalVisible = (visible,item) => {
    this.setState({ 
      modalVisible: visible,
      dosis: item.dosis,
      vacuna: item.vacuna,
      refuerzo: item.refuerzo,
      estado: item.estado
    });
  }

  render() {
    const { date, open } = this.state;
    const value = date ? date.toLocaleString() : '';

    

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' ></StatusBar>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Nino')}
        >
          <Text style={{ marginTop: 40, textAlign: 'left', color: '#424242', fontSize: 16, left: 30 }}>
            {'< Infomación < Vacunas'} </Text>

        </TouchableOpacity>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}
        >

          <TouchableOpacity
            style={styles.button}
          >
            <Text
              style={styles.title}
            >Vacunas pendientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
          >
            <Text
              style={styles.title}
            >Vacunas aplicadas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
          >
            <Text
              style={styles.title}
            >Todas</Text>
          </TouchableOpacity>


        </View>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <View
              style={styles.infoCard}
            >
              <Text
                style={{ borderRightWidth: 1, borderRightColor: '#1C94A4', width: 140, height: 40, textAlign: 'center', justifyContent: 'center' }}
              >{item.dosis}{item.refuerzo} </Text>
              <Text
                style={{ borderRightWidth: 1, borderRightColor: '#1C94A4', width: 113, height: 40, textAlign: 'center' }}
              >{item.vacuna} </Text>
              <TouchableOpacity
                onPress={() => {
                 
                  this.setModalVisible(!this.state.modalVisible,item);

                }}
              >
                <MaterialIcons
                  name='add'
                  size={20}
                  color='black'
                />
              </TouchableOpacity>
            </View>
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View
            style={styles.centeredViews}
          >
            <View style={styles.modalView}>
              <MaterialIcons
                name='close'
                size={24}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible,{ modalVisible: false,
                    dosis: '',
                    vacuna: '',
                    refuerzo: '',
                    estado: 'false'});
                }}
              >
              </MaterialIcons>

              <View style={styles.form}>
                <View
                  style={{
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    width: 270,
                    height: 40,
                    borderRadius: 4,
                    padding: 0,
                    color: '#C4C4C4'
                  }}
                >
                  <Text>{"Vacuna:"+this.state.vacuna}</Text>
                  <Picker
                    style={styles.pickerComponent}
                    selectedValue={this.state.estado}
                    onValueChange={
                      (itemValor, itemIndex) =>
                        this.setState({
                          hijo: itemValor
                        })
                    }

                  >
                    <Picker.Item label='Estado' value='0' />
                    <Picker.Item label='Aplicada' value={'true'} />
                    <Picker.Item label='Pendiente' value={'false'} />

                  </Picker>
                </View>

                <View>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={this.state.data}
                    onDateChange={this.changeDate}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    width: 270,
                    height: 40,
                    borderRadius: 4,
                    padding: 10,
                    color: '#C4C4C4'
                  }}
                  onPress={this._showDateTimePicker}>
                  <Text
                    style={{ textAlign: 'left', color: '#C4C4C4', fontSize: 16 }}
                  >Cumpleaños</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text
                    style={{ color: '#ffffff', fontWeight: '500' }}
                  >Agregar</Text>
                </TouchableOpacity>
                <View>

                </View>







              </View>
            </View>
          </View>
        </Modal >



        <View>

        </View>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  buttonModal: {
    marginTop: 68,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  subtitle: {
    marginLeft: 10
  },
  listTab: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center'
  },
  textTab: {
    fontSize: 16
  },
  btnTabActive: {
    backgroundColor: '#E6838D'
  },
  infoCard: {
    flexDirection: 'row',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#05A4AC',
    borderRadius: 4,
    width: 300,
    height: 40,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerComponent: {
    height: 40,
    width: 270,
    fontSize: 16,
    color: '#C4C4C4',

  },
  dateComponent: {
    borderRadius: 4
  },
  centeredViews: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(212, 228, 231, 0.5)',
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});
