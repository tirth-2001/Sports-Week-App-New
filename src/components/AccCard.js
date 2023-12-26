import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccCard = ({ann, seq, len, showNewBadge, lastOpenValue}) => {
  const {title, subtitle, annImage, publishedDate} = ann || [];
  // const [lastOpenValue, setLastOpenValue] = useState();
  var showBadge = publishedDate > lastOpenValue;
  console.log(
    `Published Date : ${publishedDate} |||| lastOpenValue : ${lastOpenValue}  ==> publish>lastOpen : ${showBadge}`,
  );
  // console.log('Show Badge: ' + showNewBadge);
  // console.log(seq, len);

  const getLastOpenData = async () => {
    try {
      const value = await AsyncStorage.getItem('lastAnOpen');
      if (value !== null) {
        console.log(
          '[Ann Card] => READ - Last Open Announcement Page : ',
          value,
        );
        // setLastOpenValue(value);
        // console.log('=> [Ann Card] Last Open Value', lastOpenValue);
      }
      // else {
      //   storeLastOpenData(moment().valueOf().toString());
      // }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   console.log('useEffect 5');
  //   getLastOpenData();
  // }, []);

  return (
    <View
      style={{
        height: showBadge ? 160 : 140,
        width: Dimensions.get('window').width - 20,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 24,

        borderRadius: 15,
        elevation: 7,
        backgroundColor: '#fff',
        shadowOffset: {width: 0, height: 10},
        shadowColor: '#333',
        shadowOpacity: 1.0,
        shadowRadius: 22,
        borderWidth: 0,
        borderColor: '#ddd',
      }}>
      {showBadge && (
        <View
          style={{
            width: '100%',
            height: 16,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginBottom: 3,
          }}>
          <Image
            source={require('../assets/images/new_badge.png')}
            style={{width: 50, height: 23, borderRadius: 0}}
          />
        </View>
      )}

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <Image
            source={{uri: annImage}}
            style={{width: 120, height: 70, borderRadius: 25}}
            resizeMode="center"
          />
        </View>
        <View>
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                width: Dimensions.get('window').width / 2 + 8,
                textAlign: 'justify',
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 8,
                width: Dimensions.get('window').width / 2 + 8,
                height: 58,
                textAlign: 'justify',
                color: '#4f4f4f',
              }}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
          // width: Dimensions.get('window').width,
          // borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="time" size={20} color="#7f7f7f" />
          <Text
            style={{
              fontSize: 14,
              color: '#7f7f7f',
              marginHorizontal: 8,
              marginLeft: 2,
            }}>
            {' '}
            {moment(parseInt(publishedDate)).format('hh:mm A')}
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#7f7f7f', marginHorizontal: 10}}>
          {' '}
          {moment(parseInt(publishedDate)).format('DD-MM-YYYY')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccCard;
