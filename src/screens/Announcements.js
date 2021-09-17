import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AccCard from '../components/AccCard';

const Announcements = () => {
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
