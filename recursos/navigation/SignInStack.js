import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../HomeScreen";
import LoadingScreen from "../LoadingScreen";
import VacunasScreen from "../VacunasScreen";
import EstaturaScreen from "../EstaturaScreen";
import PesoScreen from "../PesoScreen";
import PostScreen from "../PostScreen";
import PerfilNinoScreen from "../PerfilNinoScreen";
import ProfileScreen from "../ProfileScreen";

const Stack = createStackNavigator();

const SignInStack = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }
            else if (route.name === 'Post') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#05A4AC',
          inactiveTintColor: 'gray',
        }}>
        <Tabs.Screen name="Home" component={HomeStackScreen}  />
        <Tabs.Screen name="Post" component={PostStackScreen} />
        <Tabs.Screen name="Profile" component={ProfileStackScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  )
};

export default SignInStack;



const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const PostStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 80, height: 80 }}
      source={require("../imagenes/logoSanitos.png")}
    />
  );
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerTitle: props => <LogoTitle {...props} />, headerTitleAlign: 'center', }} />
      <HomeStack.Screen name="Nino" component={PerfilNinoScreen} options={{
        title: "Perfil del niño/a", headerStyle: {
          backgroundColor: "#05A4AC"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }} />
      <HomeStack.Screen name="Peso" component={PesoScreen} options={{
        title: "Perfil del niño/a", headerStyle: {
          backgroundColor: "#05A4AC"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }} />
    </HomeStack.Navigator>
  );
}

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const PostStackScreen = () => {
  return (
    <PostStack.Navigator headerMode="none">
      <PostStack.Screen name="Post" component={PostScreen} />
    </PostStack.Navigator>
  );
}

