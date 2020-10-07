import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
} from "react-native";
/*import logoSanitos from './recursos/imagenes/logoSanitos.png';*/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import AuthNavigator from './recursos/navigation/AuthNavigator';

//import firebase from "./recursos/utils";

import LoadingScreen from "./recursos/LoadingScreen";
import LoginRegisterScreen from "./recursos/LoginRegisterScreen";
import LoginScreen from "./recursos/LoginScreen";
import SignupScreen from "./recursos/SignupScreen";
import VacunasScreen from "./recursos/VacunasScreen";
import EstaturaScreen from "./recursos/EstaturaScreen";
import PesoScreen from "./recursos/PesoScreen";
import PostScreen from "./recursos/PostScreen";
import PerfilNinoScreen from "./recursos/PerfilNinoScreen";
import HomeScreen from "./recursos/HomeScreen";
import ProfileScreen from "./recursos/ProfileScreen";

/* const AppTabNavigator = createBottomTabNavigator(
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
); */

/* const AuthStack = createStackNavigator({
  App: AppTabNavigator,
  LoginRegister: LoginRegisterScreen,
  Login: LoginScreen,
  Register: SignupScreen,
  Home: HomeScreen,
  Nino: PerfilNinoScreen,
  Vacunas: VacunasScreen,
  Peso: PesoScreen,
  Estatura: EstaturaScreen,
}); */


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const PostStack = createStackNavigator();
const ProfileStack = createStackNavigator();
/* const AppTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}
 */

{/*const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
       <HomeStack.Screen name="Nino" component={PerfilNinoScreen} /> 
    </HomeStack.Navigator>
  );
}*/}

/* const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const PostStackScreen = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Post" component={PostScreen} />
    </PostStack.Navigator>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      Login: () => {
        setIsLoading(false);
        setUserToken('asd');
      },
      Register: () => {
        setIsLoading(false);
        setUserToken('asd');
      },
      singOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    }
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <Tabs.Navigator>
            <Tabs.Screen name="Home" component={HomeStackScreen} />
            <Tabs.Screen name="Post" component={PostStackScreen} />
            <Tabs.Screen name="Profile" component={ProfileStackScreen} />
          </Tabs.Navigator>
        ) : (
            <AuthStack.Navigator >
              <AuthStack.Screen name="LoginRegister" component={LoginRegisterScreen} options={{ headerShown: false }} />
              <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <AuthStack.Screen name="Register" component={SignupScreen} options={{ headerShown: false }} />
            </AuthStack.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}



export default App; */

const App = () => {
  return (
    <AuthNavigator />
  ); 
};

export default App;
