import React from "react";
/*import logoSanitos from './recursos/imagenes/logoSanitos.png';*/
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./recursos/LoadingScreen";
import LoginRegisterScreen from "./recursos/LoginRegisterScreen";
import LoginScreen from "./recursos/LoginScreen";
import SignupScreen from "./recursos/SignupScreen";
import VacunasScreen from "./recursos/VacunasScreen";
import VacunasInfoScreen from "./recursos/VacunasInfoScreen";
import EstaturaScreen from "./recursos/EstaturaScreen";
import PesoScreen from "./recursos/PesoScreen";
import PostScreen from "./recursos/PostScreen";
import PerfilNinoScreen from "./recursos/PerfilNinoScreen";
import HomeScreen from "./recursos/HomeScreen";
import ProfileScreen from "./recursos/ProfileScreen";
import AgregarNinoScreen from "./recursos/AgregarNinoScreen";
import ForgotPasswordScreen from "./recursos/ForgotPasswordScreen";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        ),
      },
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-add-circle"
            size={48}
            color={"#E9446A"}
            style={{
              shadowColor: "#E9446A",
              shadowOffset: {
                width: 0,
                height: 0,
                shadowRadius: 10,
                shadowOpacity: 0.3,
              },
            }}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
    },
  }
);

const AuthStack = createStackNavigator({
  LoginRegister: LoginRegisterScreen,
  Login: LoginScreen,
  Register: SignupScreen,
  Home: HomeScreen,
  App: AppTabNavigator,
  Nino: PerfilNinoScreen,
  ForgotPassword: ForgotPasswordScreen,
  Vacunas: VacunasScreen,
  VacunasInfo: VacunasInfoScreen,
  Peso: PesoScreen,
  Estatura: EstaturaScreen,
  AgregarNino: AgregarNinoScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
