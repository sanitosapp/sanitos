import React from 'react'
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, AsyncStorage, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as firebase from 'firebase'


//VISTA HOME PRINCIPAL
export default class PerfilNinoScreen extends React.Component {



  constructor() {
    super()
    this.state = {
      Nino: ""
    }
    try {
      AsyncStorage.getItem('database_ninoinfo1').then((value) => {
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
            //MOSTRANDO LA DATA RECOLECTADA DEL NIÑO
            style={styles.infoCard}
            key={i}>

            <View>
              <Text
                style={{ textAlign: 'center', backgroundColor: '#05A4AC', padding: 6, color: '#fff', textTransform: 'uppercase' }}
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

          </View>

        )
      })
    }
  }

  render() {

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

        <View>

          <View
            style={{ flexDirection: 'row' }}
          >
            <View>

              <Image
                resizeMode='contain'
                source={require('../recursos/imagenes/peso.png')}
                style={{ width: 50, height: 50, marginTop: 40, alignSelf: 'center' }}
              />
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.props.navigation.navigate('Peso')}
              >
                <Text
                  style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}
                >Peso</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Image
                resizeMode='contain'
                source={require('../recursos/imagenes/estatura.png')}
                style={{ width: 50, height: 50, marginTop: 40, alignSelf: 'center' }}
              />
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.props.navigation.navigate('Vacunas')}
              >
                <Text
                  style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}
                >Estatura</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flexDirection: 'row' }}
          >
            <View>
              <Image
                resizeMode='contain'
                source={require('../recursos/imagenes/estatura.png')}
                style={{ width: 50, height: 50, marginTop: 40, alignSelf: 'center' }}
              />
              <Text
                style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}
              >Estadistica</Text>
            </View>


            <View>
              <Image
                resizeMode='contain'
                source={require('../recursos/imagenes/vacunas.png')}
                style={{ width: 50, height: 50, marginTop: 40, alignSelf: 'center' }}
              />
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.props.navigation.navigate('Vacunas')}
              >
                <Text
                  style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}
                >Vacunas</Text>
              </TouchableOpacity>
            </View>
            </View>


          </View>



        
      </ScrollView>




    );
  }
}

const styles = StyleSheet.create({
          container: {
          flex: 1,
    padding: 30,
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
  }


});
