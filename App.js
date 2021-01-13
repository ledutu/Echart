import React, { Component } from 'react'
import { Text, View } from 'react-native'
import StockScreen from './src/screens/StockScreen/StockScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { SafeAreaView } from 'react-native-safe-area-context';

window.localStorage = AsyncStorage;
global.Buffer = Buffer;

export default class App extends Component {
  render() {
    return (

      // <SafeAreaView>
      <StockScreen />
      // </SafeAreaView >
    )
  }
}
