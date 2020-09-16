import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, TextInput } from 'react-native'

import * as firebase from 'firebase'

//VISTA PERFIL USUARIO

export default class ProfileScreen extends React.Component {
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

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>

        <Text style={{ marginTop: 60, textAlign: 'center', color: '#424242', fontSize: 16}}>
          Mi perfil</Text>

        <View
        style={{marginTop:32}}
        >
          <TextInput
            style={styles.input}
            
          >Hola! </TextInput>
          <TextInput
            style={styles.input}
          >Hola {this.state.email}! </TextInput>
          <TextInput
            style={styles.input}
          >Hola! </TextInput>

        </View>


        <TouchableOpacity
          style={styles.button2}
          onPress={this.signOutUser}
          
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Editar
                      </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.signOutUser}
        >
          <Text style={{color: '#fff', fontSize: 16 }}>
            Salir
                      </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 18,
    left:30,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    width:300,
    fontSize: 16,
    color: '#C4C4C4',
    padding: 10,
  },
  button: {
    position:'absolute',
    top:522,
    left:30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    width:300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2: {
    position:'absolute',
    top:464,
    left:30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    width:300,
    alignItems: 'center',
    justifyContent: 'center'
  },
});