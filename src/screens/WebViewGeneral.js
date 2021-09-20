import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';


const WebViewGeneral = ({ navigation, route }) => {
  
  //  useEffect(() => {
  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
  //     return () => backHandler.remove()
  //   }, [])

   React.useLayoutEffect(() => {
    navigation.setOptions({
      title: cardName,
    });
  }, [navigation]);


  
  const [webLink, setWebLink] = useState(route?.params.webLink);
  const [cardName, setCardName] = useState(route?.params.cardName);


  return (
    <View style={styles.container}>
      
        <WebView style={styles.webViewStyle} source={webLink} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 0
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
