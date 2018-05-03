import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import CONFIG from './constants/index';
import Video from './screens/video';
export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
const RootStack = StackNavigator({
  home: {
    screen: HomeScreen,
  },
  video :{
    screen : Video
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
