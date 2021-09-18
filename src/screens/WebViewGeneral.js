import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const backHandler = ({navigation, route}) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (route.name === 'HomeScreen') {
      return true;
    } else {
      return false;
    }
  });
};

const WebViewGeneral = ({navigation, route}) => {
  

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginVertical: 30,
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'red',
          // borderWidth: 1,
        }}>
        Sports App
      </Text>
        <WebView style={styles.webViewStyle} source={{ uri: 'https://google.com' }} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: 'purple',
  },
  webViewStyle: {
    // height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#000',
  },
  webViewContainer: {
    borderWidth: 1,
  }
});

export default WebViewGeneral;
