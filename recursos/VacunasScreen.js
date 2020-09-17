import React from 'react'
import { Image, ListUserItem, StatusBar, View, StyleSheet, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native'
import { MaterialIcons,Feather } from '@expo/vector-icons'
import { ButtonGroup, Divider, Button, Text } from 'react-native-elements'


import * as firebase from 'firebase'

//VISTA HOME PRINCIPAL
export default class VacunasScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  }

  buttonPressed() {
    return(
      <View
            style={styles.infoCard}>



            <View
              style={{ padding: 10, flexDirection: 'row', alignContent:'center', alignItems:'center', justifyContent:'space-between' }}
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
  }



  render() {


    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' ></StatusBar>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Nino')}
        >
          <Text style={{ marginTop: 40, textAlign: 'left', color: '#424242', fontSize: 16, left: 30 }}>
            {'< Infomación < Vacunas'} </Text>

        </TouchableOpacity>

        <View
          style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center', marginTop: 40 }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Nino')}
          >
            <Text
              style={{ textAlign: 'center', padding: 6, fontSize: 16, color: '#fff' }}
            > Vacuna pendiente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Nino')}

          >
            <Text
              style={{ textAlign: 'center', padding: 6, fontSize: 16, color: '#fff' }}
            > Vacuna aplicada</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.buttonPressed()}
          >
            <Text
              style={{ textAlign: 'center', padding: 6, fontSize: 16, color: '#fff' }}
            > Todas</Text>
          </TouchableOpacity>
        </View>

        <View>

        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  subtitle: {
    marginLeft: 10
  }
});
