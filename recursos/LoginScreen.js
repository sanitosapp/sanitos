import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'

import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'
import { color } from 'react-native-reanimated'




//VISTA LOGIN
export default class LoginScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  };

  state = {
    email: "",
    password: "",
    errorMessage: null
  };


  handleLogin = () => {
    const { email, password } = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }))
  }




  render() {

    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' ></StatusBar>


        <Text style={styles.greeting}>
          {'Inicie sesión'}
        </Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <TextInput
              placeholder={'Email'}
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View>
            <TextInput
              placeholder={'Contraseña'}
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('')}
        >
          <Text style={{ marginTop: 12, color: '#05A4AC', fontSize: 14, textAlign: 'right' }}>
            ¿Olvido su contraseña?
                    </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleLogin}
        >
          <Text
            style={{ color: '#ffffff', fontWeight: '500' }}
          >Ingresar</Text>
        </TouchableOpacity>
        <Button 
          style={styles.button}
          onPress={this.handleLogin}
          title='Ingresar'
        />



        <TouchableOpacity
          style={styles.buttonFb}
           onPress={this.LoginFb}
        >
          <Text
            style={{ color: '#ffffff', fontWeight: '500' }}
          >Ingresar con Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', position: 'absolute', top: 564 }}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ color: '#414959', fontSize: 14 }}>
            ¿No tiene cuenta? <Text style={{ fontWeight: '500', color: '#05A4AC' }}>Registrese aquí</Text>
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  greeting: {
    marginTop: 84,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#424242'
  },
  errorMessage: {
    color: '#E9446A',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C4C4C4',
    height: 40,
    fontSize: 16,
    color: '#161F3D',
    padding: 10,
  },
  button: {
    marginTop: 18,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonFb: {
    marginTop: 18,
    backgroundColor: '#3C609F',
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    marginTop: 100,
  }
});
