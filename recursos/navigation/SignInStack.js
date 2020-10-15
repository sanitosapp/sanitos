import React from "react";
import { Image, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../HomeScreen";
import LoadingScreen from "../LoadingScreen";
import VacunasScreen from "../VacunasScreen";
import EstaturaScreen from "../EstaturaScreen";
import PesoScreen from "../PesoScreen";
import PostScreen from "../PostScreen";
import PerfilNinoScreen from "../PerfilNinoScreen";
import ProfileScreen from "../ProfileScreen";
import SingOutScreen from "../SingOutScreen";
import VacunasInfoScreen from "../VacunasInfoScreen";
import ChildChartScreen from "../chart/ChildChartScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SignInStack = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Peso") {
              iconName = focused ? "weight" : "weight";
            } else if (route.name === "Profile") {
              iconName = focused ? "account" : "account";
            } else if (route.name === "Vacuna") {
              iconName = focused ? "ammunition" : "ammunition";
            }else if (route.name === "Estatura") {
              iconName = focused ? "human-male-height" : "human-male-height";
            }else if (route.name === "Crecimiento") {
              iconName = focused ? "chart-areaspline-variant" : "chart-areaspline-variant";
            }

            // You can return any component that you like here!
  
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: "#05A4AC",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: "Home" }}
        />
        <Tabs.Screen
          name="Peso"
          component={PesoStackScreen}
          options={{ title: "Peso" }}
        />
        <Tabs.Screen
          name="Estatura"
          component={EstaturaStackScreen}
          options={{ title: "Estatura" }}
        />
        <Tabs.Screen
          name="Vacuna"
          component={VacunaStackScreen}
          options={{ title: "Vacuna" }}
        />
        <Tabs.Screen
          name="Crecimiento"
          component={CrecimientoStackScreen}
          options={{ title: "Crecimiento" }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ title: "Perfil" }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
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
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Sanitos",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D96A3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          } /* headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"
            />
          ), */,
        }}
      />
      <HomeStack.Screen
        name="Nino"
        component={PerfilNinoScreen}
        options={{
          title: "Perfil del niño/a",
          headerStyle: {
            backgroundColor: "#1D96A3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
      <HomeStack.Screen
        name="Peso"
        component={PesoScreen}
        options={{
          title: "Peso",
          headerStyle: {
            backgroundColor: "#C13273",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
      <HomeStack.Screen
        name="Estatura"
        component={EstaturaScreen}
        options={{
          title: "Estatura",
          headerStyle: {
            backgroundColor: "#C13273",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
      <HomeStack.Screen
        name="Vacunas"
        component={VacunasScreen}
        options={{
          title: "Vacunas",
          headerStyle: {
            backgroundColor: "#1D96A3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
      <HomeStack.Screen
        name="VacunasInfo"
        component={VacunasInfoScreen}
        options={{
          title: "Vacunas",
          headerStyle: {
            backgroundColor: "#1D96A3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
      <HomeStack.Screen
        name="ChildChart"
        component={ChildChartScreen}
        options={{
          title: "Curva de crecimiento",
          headerStyle: {
            backgroundColor: "#1D96A3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const VacunaStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const PesoStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const EstaturaStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const CrecimientoStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const PostStackScreen = () => {
  return (
    <PostStack.Navigator headerMode="none">
      <PostStack.Screen name="Post" component={PostScreen} />
    </PostStack.Navigator>
  );
};
