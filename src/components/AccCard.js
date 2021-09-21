import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccCard = ({ann, seq, len}) => {
  const {title, subtitle, annImage, publishedDate} = ann || [];
  // console.log('Title: ' + title);
  console.log(seq, len);

  return (
    <View
      style={{
        height: 140,
        width: Dimensions.get('window').width - 20,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 24,

        borderRadius: 15,
        elevation: 7,
        backgroundColor: '#fff',
        shadowOffset: {width: 0, height: 10},
        shadowColor: '#000',
        shadowOpacity: 1.0,
        shadowRadius: 22,
        // borderWidth: 1,
        borderColor: '#ddd',
      }}>
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
