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
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import {announceList} from '../utils/announceList';

// Import API Calls
import {getAnnouncements} from '../admin/AnnApi';

const Header = ({route, navigation}) => {
  const [lastOpenVariable, setLastOpenVariable] = useState('');
  const [lastOpenVariable1, setLastOpenVariable1] = useState('');
  const [showBadge, setShowBadge] = useState(true);
  const [badgeValue, setBadgeValue] = useState(0);
  const [flagValue, setFlagValue] = useState(true);
  const [dummy, setDummy] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [tempValue, setTempValue] = useState(false);

  const preloadAnnouncements = () => {
    setIsLoading(true);
    getAnnouncements().then(data => {
      // console.log("API Data : ", data);
      if (data.error) {
        Snackbar.show('Error fetching Announcements', 'Try again');
      } else {
        // console.log(data);
        const arr = data.filter(ann => ann.isPublished && ann.publishedDate);
        setAnnouncements(arr);
        console.log('Ann Length', announcements.length);
        setIsLoading(false);
      }
    });
  };

  const getLastOpenData = async () => {
    try {
      const value = await AsyncStorage.getItem('lastAnOpen');
      if (value !== null) {
        // console.log(
        //   '=> [HomeScreen] READ - Last Open Announcement Page : ',
        //   value,
        // );
        setLastOpenVariable(value);
      }
      // else {
      //   storeLastOpenData(moment().valueOf().toString());
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const calculateCount = () => {
    const annouceListArray =
      announcements.length > 0 &&
      announcements
        // .filter(ann => ann.isPublished && ann.publishedDate)
        .filter(item => {
          return item.publishedDate > lastOpenVariable;
        });

    const count = annouceListArray.length;

    setBadgeValue(count);
    console.log('=> CALCULATE - Count : ', count);
    // return count;
  };

  useEffect(() => {
    console.log('useEffect 1');
    getLastOpenData();
    preloadAnnouncements();
  }, [route?.params]);

  useEffect(() => {
    console.log('useEffect 2');
    getLastOpenData();
    // preloadAnnouncements();
    console.log('\n--------------------\n');
    //  setBadgeValue(calculateCount());
    calculateCount();
    console.log('BadgeValue', badgeValue);
  }, [lastOpenVariable, announcements]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Shahibaug Green Sports Week 🏅\nMobile App 📱 \n\nDownload this app now... 👇 \n\nGoogle Playstore Link : \nhttps://play.google.com/store/apps/details?id=com.sportsweekapp',
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
          onPress={() => {
            navigation.navigate('Announcements');
          }}
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
            style={{
              position: 'absolute',
              top: -5,
              left: 12,
              margin: 10,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            size={20}
            visible={badgeValue > 0}>
            {badgeValue}
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShare}
          activeOpacity={0.5}
          style={{borderWidth: 0, width: 35, height: 45}}>
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

const styles = StyleSheet.create({
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
});

export default Header;
