import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import GeneralCard from '../components/GeneralCard';
import { dataList } from '../utils/dataList';
import { announceList } from '../utils/announceList';
import Header from '../components/Header';

const RegisterFab = ({navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.fab}
      onPress={() => navigation.navigate('Register')}>
      <Image
        source={require('../assets/images/user-plus-solid.png')}
        style={{width: 22, height: 22, marginRight: 10}}
      />
      <Text style={styles.fabText}>New Player</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation, route }) => {

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Header navigation={navigation} route={route} />
          <View style={{height: 60}}></View>

          {dataList.map((item, index) => (
            <GeneralCard
              key={index}
              cardName={item.cardName}
              color={item.color}
              imageName={item.imageName}
              navigation={navigation}
              webLink={item.webLink}
            />
          ))}
        </View>

        <View style={{height: 100, backgroundColor: '#fff'}}></View>
      </ScrollView>
      <RegisterFab navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    margin: 15,
    position: 'absolute',
    right: 6,
    top: 0,
  },
  logo: {
    marginTop: 10,
  },

  landscapeImage: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: -10,
  },
  image2: {
    height: 60,
    width: 250,
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    flexDirection: 'row',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2e3e7e',
    height: 45,
    width: 140,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
    borderWidth: 0.4,
    borderColor: '#7f7f7f',
  },
  fabText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
