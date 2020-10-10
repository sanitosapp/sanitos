import React from 'react'
import { Alert, Picker, TextInput, TouchableWithoutFeedback, ScrollView, Image, View, Text, StatusBar, StyleSheet, TouchableOpacity, LayoutAnimation, AsyncStorage, Modal, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { MaterialIcons } from '@expo/vector-icons'


import * as firebase from 'firebase'


//VISTA HOME PRINCIPAL
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  }


  state = {
    name: ""
  }

  state = {
    escolaridade: ""
  };

  state = {
    sangre: ""
  };

  state = {
    data: ""
  };

  changeName(name) {
    this.setState({ name })
  }

  changeDate = (valor) => {
    this.setState({
      data: valor
    })
  }

  buttonPressed() {
    const arrayDataNino = [];
    if (this.state.name && this.state.escolaridade && this.state.sangre && this.state.data) {
      const dataNino = {
        name: this.state.name,
        escolaridade: this.state.escolaridade,
        sangre: this.state.sangre,
        data: this.state.data
      }
      arrayDataNino.push(dataNino);
      try {
        AsyncStorage.getItem('database_agregarnino0').then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(dataNino)
            AsyncStorage.setItem('database_agregarnino0', JSON.stringify(d)).then(() => {
              this.modalHandler()
            })
          } else {
            AsyncStorage.setItem('database_agregarnino0', JSON.stringify(arrayDataNino)).then(() => {
              this.modalHandler()
            })
          }
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      Alert.alert('Falta completar un campo')
    }
  }

  state = {
    isVisible: false
  }
  goToChart = () => {
    this.props.navigation.navigate('ChildChart');
  }
  modalHandler = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  state = {
    email: "",
    displayName: ""
  }

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  constructor() {
    super()
    this.state = {
      Nino: ""
    }
    try {
      AsyncStorage.getItem('database_agregarnino0').then((value) => {
        this.setState({
          Nino: JSON.parse(value)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
  parseData() {
    if (this.state.Nino) {
      return this.state.Nino.map((dataNino, i) => {
        return (
          <View
            style={styles.infoCard}
            key={i}>

            <View>
              <Text
                style={{ fontSize: 16, textAlign: 'center', backgroundColor: '#1D96A3', padding: 6, color: '#fff', textTransform: 'uppercase' }}
              >{dataNino.name} </Text>
            </View>

            <View
              style={{ flexDirection: 'row' }}
            >
              <View>
                <Image
                  source={require('../recursos/imagenes/logoSanitos.png')}
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <View
                style={{ padding: 10 }}
              >
                <Text>{dataNino.escolaridade} </Text>
                <Text>{dataNino.sangre} </Text>
                <Text>{dataNino.data} </Text>

              </View>


            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Nino')}
              >
                <Text
                  style={{ textAlign: 'center', padding: 6, fontSize: 16, color: '#C4C4C4' }}
                > + Presiona aqui para ver mas  </Text>
              </TouchableOpacity>


            </View>
          </View>
        )
      })
    }
  }

  render() {
    const { isVisible } = this.state;
    LayoutAnimation.easeInEaseOut();

    return (




      <ScrollView
        style={styles.container}
      >
        <StatusBar barStyle='light-content' ></StatusBar>



        <Text style={{ marginTop: 60, left: 30, fontSize: 16 }}>
          Bienvenida {this.state.email} !{'\n'}
          Estamos felices de verte por aquí
          </Text>
        <View style={styles.containerCards}>
          {this.parseData()}
        </View>

        <View style={styles.infoCard}>
          <TouchableOpacity
            onPress={this.goToChart}
          >
            <Text
              style={{ textAlign: 'center', padding: 20, fontSize: 16, color: '#C4C4C4' }}
            > Ver Reporte </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <TouchableOpacity
            onPress={this.modalHandler}
          >
            <Text
              style={{ textAlign: 'center', padding: 20, fontSize: 16, color: '#C4C4C4' }}
            > +  Agregue los datos de su niño/niña </Text>
          </TouchableOpacity>
        </View>


        <Modal
          visible={false}
          transparent={true}
          animationType='fade'
        >
          <TouchableOpacity
            onPress={() => this.modalHandler()}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableWithoutFeedback>

              <View
                style={{ height: '80%', width: '80%', backgroundColor: 'grey', padding: 10, borderRadius: 4 }}
              >
                <MaterialIcons
                  name='close'
                  size={24}
                  onPress={() => this.modalHandler()}
                >
                </MaterialIcons>

                <View style={styles.form}>

                  <View>
                    <Text
                      style={styles.title1}
                    >Agregar niña/a</Text>
                  </View>

                  <View>

                    <TextInput
                      style={styles.input}
                      placeholder='Nombre'
                      autoCapitalize='none'
                      onChangeText={(name) => this.changeName(name)}
                      value={this.state.name}
                    ></TextInput>
                  </View>



                  <View>

                    <Picker
                      style={styles.pickerComponent}
                      selectedValue={this.state.escolaridade}
                      onValueChange={
                        (itemValor, itemIndex) =>
                          this.setState({
                            escolaridade: itemValor
                          })
                      }

                    >
                      <Picker.Item label='Sexo' value='' />
                      <Picker.Item label='Niña' value='Niña' />
                      <Picker.Item label='Niño' value='Niño' />

                    </Picker>
                  </View>

                  <View>

                    <Picker
                      style={styles.pickerComponent}
                      selectedValue={this.state.sangre}
                      onValueChange={
                        (itemValor, itemIndex) =>
                          this.setState({
                            sangre: itemValor
                          })
                      }
                    >
                      <Picker.Item label='Tipo de sangre' value='' />
                      <Picker.Item label='A positivo' value='A positivo' />
                      <Picker.Item label='A negativo' value='A negativo' />
                      <Picker.Item label='B positivo' value='B positivo' />
                      <Picker.Item label='B negativo' value='B negativo' />
                      <Picker.Item label='O negativo' value='O negativo' />
                      <Picker.Item label='O negativo' value='O negativo' />
                      <Picker.Item label='AB positivo' value='AB positivo' />
                      <Picker.Item label='AB negativo' value='AB negativo' />


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
                    style={styles.button}
                    onPress={() => this.buttonPressed()}
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

      </ScrollView >




    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#05A4AC',
    borderRadius: 4,
    width: 300,
    left: 30,
  },
  containerCards: {
    marginTop: 30,
  },
  button: {

    backgroundColor: '#E9446A',
    borderRadius: 4,

    alignItems: 'center',
    justifyContent: 'center'
  },

});
