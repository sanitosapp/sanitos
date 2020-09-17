import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import LoadingScreen from './recursos/LoadingScreen'
import LoginRegisterScreen from './recursos/LoginRegisterScreen'
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
import AgregarNinoScreen from './recursos/AgregarNinoScreen'

const screens = {
  Home: {
    screen:
  }
}
const AuthStack = createStackNavigator (screens)