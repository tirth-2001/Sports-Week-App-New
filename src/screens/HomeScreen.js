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
import {announceList} from '../utils/announceList';

const Header = ({ navigation }) => {

  const [lastOpenVariable, setLastOpenVariable] = useState("");
  const [showBadge, setShowBadge] = useState(true);
  const [badgeValue, setBadgeValue] = useState(0);
  const [flagValue, setFlagValue] = useState(false);
  
const storeLastOpenData = async (value) => {
  try {
    await AsyncStorage.setItem('lastAnOpen', value);

    console.log('=> STORE - Last Open Announcement Page : ', value);
  } catch (e) {
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
  
  const getLastOpenData = async () => {
  try {
    const value = await AsyncStorage.getItem('lastAnOpen')
    if (value !== null) {
      console.log('=> [HomeScreen] READ - Last Open Announcement Page : ', value);
      setLastOpenVariable(value);
    }
    // else {
    //   storeLastOpenData(moment().valueOf().toString());
    // }
  } catch(e) {
        console.log(e);

  }
  }

  const calculateCount = async () => {
    const annouceListArray = await announceList.filter(item => {
    return item.annTimeStamp > lastOpenVariable;
    });
    const count = annouceListArray.length;
    console.log('=> CALCULATE - Count : ', count);
    setBadgeValue(count);
    // return count;
  }
  // make array of values which have their values greater than lastOpenVariable from annouceList
  



  useEffect(() => {
    console.log("useEffect 1")
    getLastOpenData();
    // setLastOpenData(moment().valueOf().toString());
   

    // announceList.map((item, index) => {
    //   console.log(item);
    // });

  }, [flagValue]);

  useEffect(() => {
console.log("\n--------------------\n");
    //  setBadgeValue(calculateCount());
    calculateCount();
    console.log(badgeValue);
    if (badgeValue > 0) {
      setShowBadge(true);
    } else {
      setShowBadge(false);
    }
    console.log("\n--------------------\n");
  }, [lastOpenVariable]);
  
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
      {setFlagValue(!flagValue)}
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
            style={{position: 'absolute', top: -5, left: 12, margin: 10, borderWidth: 1, borderColor: "#fff"}}
            size={20}
            visible={showBadge}


          >
            {badgeValue}
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} activeOpacity={0.5} style={{borderWidth: 0, width: 35, height: 45,}}>
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

const HomeScreen = ({ navigation }) => {
  
//   const storeLastOpenData = async (value) => {
//   try {
//     var lastOpenValue = await AsyncStorage.setItem('last', value);
//     console.log('=> STORE - Last Open Announcement Page : ', lastOpenValue);
//   } catch (e) {
//     console.log(e);
//   }
// }
  
//   const getLastOpenData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('lastAnOpen')
//     if (value !== null) {
//     console.log('=> READ - Last Open Announcement Page : ', lastOpenValue);
//       storeLastOpenData(value);
//     }
//   } catch(e) {
//         console.log(e);

//   }
//   }

//   useEffect(() => {
//     getLastOpenData();

//   }, []);

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
