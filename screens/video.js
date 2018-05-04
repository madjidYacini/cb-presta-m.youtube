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


export default class Video extends React.Component {
                static navigationOptions = { headerStyle: { backgroundColor: '#f42627' }, 
                
                      headerRight:(
                         
                      <View style={{ flexDirection: 'row', marginRight: 30 }}>
                       
                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="videocam" size={25} color="#FFF" />
                       </TouchableOpacity>
                       <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="search" size={25} color="#FFF" />
                       </TouchableOpacity>
                       
                       <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="account-circle" size={25} color="#FFF" />
                       </TouchableOpacity>
                       
                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="account-circle" size={25} color="#FFF" />
                       </TouchableOpacity>
                      </View> )
                     };
                 render() {
                   const { params } = this.props.navigation.state;
                   return <WebView source={{ uri: `https://www.youtube.com/watch?v=${params.url}` }} style={{ marginTop: 20 }} />;
                 }
               }