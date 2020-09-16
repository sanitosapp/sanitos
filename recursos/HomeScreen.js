import React from 'react'
import { ScrollView, Image, View, Text,StatusBar, StyleSheet, TouchableOpacity, LayoutAnimation, AsyncStorage, Modal, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as firebase from 'firebase'


//VISTA HOME PRINCIPAL
export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerShown: false
  }

  state = {
    modal:false
  }

  handleModal = () => {
    this.setState({
      modal: !this.state.modal ? true : false
    })
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
      AsyncStorage.getItem('database_agregarnino1').then((value) => {
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
                onPress={() => this.props.navigation.navigate('AgregarNino')}
              >
                <Text
                  style={{ textAlign: 'center', padding:20, fontSize: 16, color: '#C4C4C4' }}
                > +  Agregue los datos de su niño/niña </Text>
              </TouchableOpacity>
        </View>

        <Button
        title="abrir modal prueba"
        onPress={this.handleModal}
        />
        <Modal
        visible={false}
        >
        <View
        style={{marginTop:50}}>
        <Text>Hola jeje</Text>
        </View>

        </Modal>

      </ScrollView>




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
  }

});
