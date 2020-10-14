import React from "react";
import { Image, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

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
              iconName = focused ? "ios-home" : "ios-home";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person";
            } else if (route.name === "Post") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
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
          name="Post"
          component={PostStackScreen}
          options={{ title: "Agregar" }}
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
          title: "Gráfico",
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

const PostStackScreen = () => {
  return (
    <PostStack.Navigator headerMode="none">
      <PostStack.Screen name="Post" component={PostScreen} />
    </PostStack.Navigator>
  );
};
