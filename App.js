import React, { useState, useEffect, useRef } from "react";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import AuthNavigator from "./recursos/navigation/AuthNavigator";

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);

  const registerForPushNotificationsAsync = async () => {
    let token;
    try {

      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = await Notifications.getExpoPushTokenAsync();
        // console.log(token);
        setExpoPushToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: "Recordatorios",
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      return token;
    } catch (error) {
      console.log("error", error);
    }

  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);

  const _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    setNotification(notification);
  };

  return <AuthNavigator />;
};

export default App;
