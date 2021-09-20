import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
// import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';


import moment from 'moment';


import AccCard from '../components/AccCard';

const Announcements = ({ navigation, route }) => {
  
  const [para1, setPara1] = useState(true);
  // console.log("Route",route)

   const getLastOpenData = async () => {
  try {
    const value = await AsyncStorage.getItem('lastAnOpen')
    if (value !== null) {
      console.log('=> READ - Last Open Announcement Page : ', value);
    }
    // else {
    //   storeLastOpenData(moment().valueOf().toString());
    // }
  } catch(e) {
        console.log(e);

  }
  }

  const setLastOpenData = async (value) => {
  try {
    await AsyncStorage.setItem('lastAnOpen', value);

    console.log('=> SET - Last Open Announcement Page : ', value);
    getLastOpenData();
  } catch (e) {
    console.log(e);
  }
  }
  
  useEffect(() => {
    setLastOpenData(moment().valueOf().toString());
  }, []);

  useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginRight: 30 }} onPress={() => navigation.navigate("HomeScreen", {
          dummyValue: 9,
          
        })
        }>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>


      <View style={styles.container}>
        <View style={{height: 20}} />
        <AccCard />
        <AccCard />
        <AccCard />
        <AccCard />
        <AccCard />
        <AccCard />
        <AccCard />
        <View style={{height: 150}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Announcements;
