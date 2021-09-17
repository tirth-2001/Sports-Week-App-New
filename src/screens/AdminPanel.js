import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
// import { WebView } from 'react-native-webview';

const backHandler = ({navigation, route}) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (route.name === 'HomeScreen') {
      return true;
    } else {
      return false;
    }
  });
};

const AdminPanel = ({navigation, route}) => {
  useEffect(() => {
    const backAction = () => {
      if (route.name === 'HomeScreen') {
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      {/* <WebView style={styles.webViewStyle} source={{ uri: 'https://admin-panel-sports.vercel.app' }} /> */}
      <Text
        style={{
          marginVertical: 30,
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'red',
        }}>
        Sports App
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'purple',
  },
  webViewStyle: {
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
  },
});

export default AdminPanel;
