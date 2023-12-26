import React from 'react';
import {StatusBar, Text} from 'react-native';
import Routes from './Routes';

const App = () => {
  return (
    <>
      {/* <Text>hello</Text> */}
      <StatusBar barStyle="light-content" backgroundColor="#13235c" />
      <Routes />
    </>
  );
};

export default App;
