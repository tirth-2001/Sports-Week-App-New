import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';


import AccCard from '../components/AccCard';

const Announcements = () => {

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
