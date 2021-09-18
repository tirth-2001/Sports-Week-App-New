import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const GeneralCard = ({cardName, color, imageName, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WebViewGeneral')}
      activeOpacity={0.9}
      style={[styles.cardContainer, {backgroundColor: color}]}>
      <View style={[styles.section1]}>
        <ImageBackground
          source={imageName}
          style={styles.cardImage}
          imageStyle={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}></ImageBackground>
      </View>
      <View style={styles.section2}>
        <Text style={styles.cardTitle}>{cardName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    marginVertical: 15,
  },
  section1: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    // marginTop: 10,
  },
  section2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
});

export default GeneralCard;