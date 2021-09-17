import React from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import Routes from './Routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#182966" />
      <Routes />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    backgroundColor: '#fff',
  },
});

export default App;
