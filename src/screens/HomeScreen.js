/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
// import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import GeneralCard from '../components/GeneralCard';
import Header from '../components/Header';

import {getWebviews} from '../admin/WebviewApi';

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

const HomeScreen = ({navigation, route}) => {
  const [webviews, setWebviews] = useState([]);

  // make a array of 6 numbers with name dummyArray
  const preloadWebviews = async () => {
    try {
      const data = await getWebviews();
      var webviewData = data.filter(w => w.priority > 0);
      setWebviews(webviewData);
    } catch (error) {
      console.log('error fetching webviews');
    }
  };

  useEffect(() => {
    preloadWebviews();
  }, []);

  console.log('webviews', webviews);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {webviews.length > 1 ? (
            <>
              <Header navigation={navigation} route={route} />
              <View style={{height: 60, backgroundColor: '#fff'}} />

              {webviews.map((item, index) => (
                <GeneralCard
                  key={index}
                  cardName={item.cardName}
                  color={item.colorCode}
                  imageName={item.webImage}
                  navigation={navigation}
                  webLink={item.webLink}
                />
              ))}
              <View style={{height: 100}} />
            </>
          ) : (
            <>
              <Header navigation={navigation} route={route} />
              <View style={{height: 60, backgroundColor: '#fff'}} />

              <View
                style={{
                  width: '100%',
                  // height: Dimensions.get('window').height,
                  height: 80,
                  backgroundColor: '#fff',
                  borderWidth: 0,
                }}>
                <ActivityIndicator size={'large'} color={'#2e3e7e'} />
              </View>
            </>
          )}
        </View>
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
    // height: Dimensions.get('window').height,
  },
  container1: {
    // flex: 1,
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
