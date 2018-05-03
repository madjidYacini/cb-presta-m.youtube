import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  HeaderButtons,
  Ionicons
} from 'react-native';
import { StackNavigator } from "react-navigation";
import {CONFIG} from '../constants/index';
import { Icon } from 'react-native-elements'
import Video from './video';
export default class HomeScreen extends React.Component {
                 _fetch() {
                   const qp = '&part=snippet,id&order=rating&maxResults=20&chart=';
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   const video = [];
                   fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regioncode=FR`)
                     .then(res => res.json())

                     .then(res => {
                       console.log('res', res);
                       res.items.forEach(v => {
                         // console.log(v);
                         video.push(v);
                       });

                       console.log(video);

                       this.setState({ video });
                       console.log('console', this.state.video);
                     });
                 }

                 state = { video: [] };
                 componentDidMount() {
                   this._fetch();
                 }

                 static navigationOptions = { headerStyle: { backgroundColor: '#f42627' }, headerLeft: <TouchableOpacity>
                       <Image source={require('../assets/logo.png')} />
                     </TouchableOpacity>, headerRight: <View style={{ flexDirection: 'row', marginRight: 30 }}>
                       <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="videocam" size={25} color="#FFF" />
                       </TouchableOpacity>
                       <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="search" size={25} color="#FFF" />
                       </TouchableOpacity>
                       
                       <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                         <Icon name="account-circle" size={25} color="#FFF" />
                       </TouchableOpacity>
                     </View> };
                 render() {
                   const list = this.state.video.map(
                     (item, id) => {
                       return (
                         <View key={id}>
                           <TouchableOpacity  onPress={() =>
                           this.props.navigation.navigate("video", {
                           url : item.id.videoId
                           })}>
                             <Image
                               style={{
                                 height: 190,
                                 marginRight: 30,
                                 marginTop: 10,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 marginLeft: 30,
                               }}
                               source={{
                                 uri:
                                   item.snippet.thumbnails
                                     .default.url,
                               }}
                             />
                             <Text
                               style={
                                 {
                                   backgroundColor: '#EA3324',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   marginLeft: 30,
                                   marginRight: 30,
                                   fontWeight: 'bold',
                                   fontSize: '15px',
                                   marginBottom: 30,
                                 } //  fontFamily: "roboto",
                               }
                             >
                               {item.snippet.title}
                             </Text>
                           </TouchableOpacity>
                         </View>
                       );
                     }
                   );
                   return <View>
                       <Text style={styles.trend}>
                         Trends in France
                       </Text>
                       <ScrollView>{list}</ScrollView>
                     </View>;
                 }
               }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    paddingHorizontal: 10,
  },
 
  ListText: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 15,
    backgroundColor: '#f99c22',

    marginTop: 10,
    padding: 10,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
  },
  
  trend: {
    backgroundColor: '#262525',
    height: 40,
    paddingTop:15,
    textAlign:"center",
    color: '#f7f7f7',
  },
});