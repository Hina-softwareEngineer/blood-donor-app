/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Root} from 'native-base';
import Navigation from './src/screens/Navigation';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App: () => React$Node = () => {
  return (
    <Root>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Root>
  );
};

export default App;
