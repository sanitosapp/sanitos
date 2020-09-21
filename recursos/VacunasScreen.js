import React, { useState } from 'react'
import { TouchableWithoutFeedback, TextInput, Modal, SafeAreaView, Text, Dimensions, Image, ListUserItem, StatusBar, View, StyleSheet, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import {Picker} from '@react-native-community/picker'






//VISTA HOME PRINCIPAL
export default class VacunasScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor() {
    super();
    this.state = {
      data: [
        {
          dosis: 'Única',
          vacuna: 'BCG',
          estado: ''
        },
        {
          dosis: 'Única',
          vacuna: 'Hepatitis B',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Pentavalente',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Polio inyección',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Rotavirus',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Neumococo',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Pentavalente',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Polio inyección',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Rotavirus',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Neumococo',
          estado: ''
        },
        {
          dosis: '3ra',
          vacuna: 'Pentavalente',
          estado: ''
        },
        {
          dosis: '3ra',
          vacuna: 'Polio oral',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Influenza',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Influenza estacional',
          estado: ''
        },
        {
          dosis: '3ra',
          vacuna: 'Neumococo',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'SPR',
          estado: ''
        },
        {
          dosis: '1ra',
          vacuna: 'Varicela',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'Influenza',
          estado: ''
        },
        {
          dosis: 'Única',
          vacuna: 'Fiebre amarilla',
          estado: ''
        },
        {
          dosis: '2da',
          vacuna: 'SRP',
          estado: ''
        },
        {
          dosis: '',
          vacuna: 'DTP',
          refuerzo: '1er refuerzo',
          estado: ''
        },
        {
          dosis: '',
          vacuna: 'Polio oral',
          refuerzo: '1er refuerzo',
          estado: ''
        },
        {
          dosis: '',
          vacuna: 'DTP',
          refuerzo: '2do refuerzo',
          estado: ''
        },
        {
          dosis: '',
          vacuna: 'Polio oral',
          refuerzo: 'Refuerzo',
          estado: ''
        },
      ],
    };
  }
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
    isVisible: false
  }

  modalHandler = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {

    const { isVisible } = this.state;

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
          style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop:20 }}
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
              <Text>{item.dosis}{item.refuerzo} </Text>
              <Text>{item.vacuna} </Text>
              <TouchableOpacity
                onPress={this.modalHandler}
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
          visible={isVisible}
          transparent={false}
          animationType='fade'
        >
          <TouchableOpacity
            onPress={() => this.modalHandler()}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableWithoutFeedback>

              <View
                style={{ height: 266, width: 300, backgroundColor: 'grey', padding: 10, borderRadius: 4 }}
              >
                <MaterialIcons
                  name='close'
                  size={24}
                  onPress={() => this.modalHandler()}
                >
                </MaterialIcons>

                <View style={styles.form}>
                  <View>

                    <Picker
                      style={styles.pickerComponent}
                      selectedValue={this.state.hijo}
                      onValueChange={
                        (itemValor, itemIndex) =>
                          this.setState({
                            hijo: itemValor
                          })
                      }

                    >
                      <Picker.Item label='Estado' value='' />
                      <Picker.Item label='Aplicada' value={true} />
                      <Picker.Item label='Pendiente' value={false} />

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
                    style={styles.buttonModal}
                    onPress={() => this.modalHandler()}
                  >
                    <Text
                      style={{ color: '#ffffff', fontWeight: '500' }}
                    >Agregar</Text>
                  </TouchableOpacity>
                  <View>

                  </View>







                </View>
              </View>


            </TouchableWithoutFeedback>
          </TouchableOpacity>
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
    flexDirection:'row',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#05A4AC',
    borderRadius: 4,
    width: 300,
    left: 30,
  },
  pickerComponent: {
    marginBottom: 18,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    width: 270,
    fontSize: 30,
    color: '#C4C4C4',
    padding: 10,
  }
});
