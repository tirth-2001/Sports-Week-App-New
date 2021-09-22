import React from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import Routes from './Routes';

import OneSignal from 'react-native-onesignal';

import codePush from 'react-native-code-push';

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('6504f9bd-9178-4642-a552-fc57346ace55');
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log('Prompt response:', response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#13235c" />
      <Routes />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    backgroundColor: '#fff',
  },
});

export default codePush(App);
