import React from 'react';
/*import logoSanitos from './recursos/imagenes/logoSanitos.png';*/
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'


import LoadingScreen from './recursos/LoadingScreen'
import LoginScreen from './recursos/LoginScreen'
import SignupScreen from './recursos/SignupScreen'

import VacunasScreen from './recursos/VacunasScreen'
import VacunasInfoScreen from './recursos/VacunasInfoScreen'
import EstaturaScreen from './recursos/EstaturaScreen'
import PesoScreen from './recursos/PesoScreen'
import PostScreen from './recursos/PostScreen'
import PerfilNinoScreen from './recursos/PerfilNinoScreen'
import HomeScreen from './recursos/HomeScreen'
import ProfileScreen from './recursos/ProfileScreen'

import * as Facebook from 'expo-facebook'

import * as firebase from 'firebase'

//Integración firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQU8tVOozkIoz2kMD_e5hMkqHzDSUsp_M",
  authDomain: "sanitosapp-d0b5f.firebaseapp.com",
  databaseURL: "https://sanitosapp-d0b5f.firebaseio.com",
  projectId: "sanitosapp-d0b5f",
  storageBucket: "sanitosapp-d0b5f.appspot.com",
  messagingSenderId: "891797980558",
  appId: "1:891797980558:web:14530c00938b7d5b3150df",
  measurementId: "G-41286CD976"
};

firebase.initializeApp(firebaseConfig);
/*  firebase.analytics();*/

const AppTabNavigator = createBottomTabNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle' size={48} color={'#E9446A'} style={{shadowColor: '#E9446A', shadowOffset: {width: 0, height: 0, shadowRadius:10, shadowOpacity:0.3}}} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor:'#161F3D',
      inactiveTintColor:'#B8BBC4',
      showLabel:false
    }
  }
);

const AuthStack = createStackNavigator ({
  Login: LoginScreen,
  Register: SignupScreen,
  Nino: PerfilNinoScreen,
  Home: HomeScreen,
  Vacunas: VacunasScreen,
  VacunasInfo: VacunasInfoScreen,
  Peso: PesoScreen,
  Estatura: EstaturaScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
