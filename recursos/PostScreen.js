import React from 'react'
import { View, Picker,Alert, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar,  AsyncStorage } from 'react-native'
import DatePicker from 'react-native-datepicker'




//FORMULARIO AGREGAR NIÑO
export default class PostScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  };

  state = {
    hijo: ""
  }

  state = {
    peso: ""
  }

  state = {
    estatura: ""
  }

  state = {
    data: ""
  }

  changePeso(peso) {
    this.setState({ peso })
  }

  changeEstatura(estatura) {
    this.setState({ estatura })
  }

  changeDate = (valor) => {
    this.setState({
      data: valor
    })
  }

  buttonPressed() {
    const arrayDataMedidas = [];
    if (this.state.peso && this.state.hijo && this.state.estatura && this.state.data) {
      const dataMedidas = {
        peso: this.state.peso,
        hijo: this.state.hijo,
        estatura: this.state.estatura,
        data: this.state.data
      }
      arrayDataMedidas.push(dataMedidas);
      try {
        AsyncStorage.getItem('database_medidasInfo').then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(dataMedidas)
            AsyncStorage.setItem('database_medidasInfo', JSON.stringify(d)).then(() => {
              this.props.navigation.navigate('Peso')
            })
          } else {
            AsyncStorage.setItem('database_medidasInfo', JSON.stringify(arrayDataMedidas)).then(() => {
              this.props.navigation.navigate('Peso')
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

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.form}>

          <View>
            <Text
              style={styles.title1}
            >Agregar medidas</Text>
          </View>





          <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#C4C4C4',
            width: 300,
            height: 40,
            borderRadius: 4,
            color: '#C4C4C4'
          }}
          >

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
              <Picker.Item label='Selecciona hija/o' value='' />
              <Picker.Item label='Juana' value='Juana' />
              <Picker.Item label='Martin' value='Martin' />

            </Picker>
          </View>

          <View
            style={{ marginTop: 20 }}
          >

            <TextInput
              style={styles.input}
              placeholder='Peso'
              keyboardType='decimal-pad'
              returnKeyType='next'
              maxLength= {6}
              autoCapitalize='none'
              onChangeText={(peso) => this.changePeso(peso)}
              value={this.state.peso}
            ></TextInput>
          </View>

          <View
            style={{ marginTop: 20 }}
          >

            <TextInput
              style={styles.input}
              placeholder='Estatura'
              keyboardType='decimal-pad'
              returnKeyType='next'
              maxLength= {6}
              autoCapitalize='none'
              onChangeText={(estatura) => this.changeEstatura(estatura)}
              value={this.state.estatura}
            ></TextInput>
          </View>

          <View>
            <DatePicker
              
              androidMode='spinner'
              placeholder='Fecha'
              mode='date'
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  title1: {
    textAlign: 'center',
    fontSize: 15,
    color: '#8A8F9E',
    marginBottom: 20,
    marginTop: 20,
    textTransform: 'uppercase'
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF'
  },
  errorMessage: {
    color: '#E9446A',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },

  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
    padding: 10,
  },
  button: {
    position: 'absolute',
    top: 480,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(211, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  pickerComponent: {
    color: '#C4C4C4',
    width:300,
    height:40,
  },
  dateComponent: {
    width: 'auto',
    marginTop: 20,
    borderRadius:4,
  }
})
