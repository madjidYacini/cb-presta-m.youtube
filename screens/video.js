import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  HeaderButtons,
  Ionicons,
} from 'react-native';
import { StackNavigator } from "react-navigation";
import { CONFIG } from '../constants/index';
import { Icon } from 'react-native-elements'
import { WebView } from 'react-native';
// const params = this.props.navigation.state.params || {};
export default class Video extends React.Component {
                 render() {
                   const {params}=this.props.navigation.state
                   return <WebView source={{ uri: `https://www.youtube.com/watch?v=${params.url}` }} style={{ marginTop: 20 }} />;
                 }
               }