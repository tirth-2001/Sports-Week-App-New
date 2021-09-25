import React, {useState, useEffect} from 'react';
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
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

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
  const dummyArray = Array.from({length: 6}, (v, k) => k);

  const preloadWebviews = async () => {
    await getWebviews().then(data => {
      // console.log('Webview API Data : ', data);
      if (data.error) {
        toast('Unable to fetch webviews', {
          type: 'error',
        });
      } else {
        // sort data by homeNumber key
        // const sortedData = data.sort((a, b) =>
        //   a.homeNumber > b.homeNumber ? 1 : -1
        // );
        var arr = data.filter(w => w.priority > 0);
        setWebviews(arr);
      }
    });
  };

  useEffect(() => {
    preloadWebviews();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {webviews.length > 1 ? (
            <>
              <Header navigation={navigation} route={route} />
              <View style={{height: 60, backgroundColor: '#fff'}}></View>

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
              <View style={{height: 100}}></View>
            </>
          ) : (
            <>
              <Header navigation={navigation} route={route} />
              <View style={{height: 60, backgroundColor: '#fff'}}></View>

              <SkeletonContent
                containerStyle={styles.container1}
                isLoading={true}
                boneColor="#f0f0f0"
                highlightColor="#e8e8e8"
                layout={dummyArray.map(item => ({
                  key: item,
                  width: Dimensions.get('window').width - 40,
                  height: 150,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginVertical: 15,
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,
                  // elevation: 8,
                  borderWidth: 0,
                }))}></SkeletonContent>
              <View
                style={{
                  width: '100%',
                  // height: Dimensions.get('window').height,
                  height: 80,
                  backgroundColor: '#fff',
                  borderWidth: 0,
                }}></View>
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
