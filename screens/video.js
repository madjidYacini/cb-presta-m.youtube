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
                 static navigationOptions = ({ navigation }) => {
                   const { state, setParams, navigate } = navigation;
                   return { headerStyle: { backgroundColor: "#f42627" }, headerLeft: <TouchableOpacity>
                         <Image source={require("../assets/logo.png")} style={{ marginLeft: 10 }} />
                       </TouchableOpacity>, headerRight: <View style={{ flexDirection: "row", marginRight: 30 }}>
                         
                         <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate("like", {})}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/love.png")} />
                         </TouchableOpacity>

                       
                         <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate("settings", {})}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/settings.png")} />
                         </TouchableOpacity>
                         <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/user.png")} />
                         </TouchableOpacity>
                       </View> };
                 };
                 render() {
                   const { params } = this.props.navigation.state;
                   return <WebView source={{ uri: `https://www.youtube.com/watch?v=${params.url}` }} style={{ marginTop: 20 }} />;
                 }
               }