import React from 'react';
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
import {Badge} from 'react-native-paper';

import GeneralCard from '../components/GeneralCard';
import {dataList} from '../utils/dataList';

const Header = ({navigation}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Shahibaug Green Sports Week - \n\nDownload this app now...',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.landscapeImage}>
        <Image
          source={require('../assets/images/landscape.png')}
          style={styles.image2}
        />
      </View>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Announcements')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderWidth: 0,
          }}>
          <Icon
            style={[styles.logo, {borderWidth: 0}]}
            name={'megaphone'}
            color="#2e3e7e"
            size={27}
          />
          <Badge
            style={{position: 'absolute', top: -5, left: 14, margin: 10}}
            size={18}
            // visible={dataList.length > 0}
          >
            2
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} activeOpacity={0.5}>
          <Icon
            style={styles.logo}
            name={'share-social'}
            color="#2e3e7e"
            size={27}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

const HomeScreen = ({navigation}) => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Header navigation={navigation} />
          <View style={{height: 60}}></View>

          {dataList.map((item, index) => (
            <GeneralCard
              key={index}
              cardName={item.cardName}
              color={item.color}
              imageName={item.imageName}
              navigation={navigation}
            />
          ))}
        </View>

        <View style={{height: 100}}></View>
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
    right: 10,
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
