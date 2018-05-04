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
  AsyncStorage
} from 'react-native';
import { StackNavigator } from "react-navigation";
import {CONFIG} from '../constants/index';
import { Icon } from 'react-native-elements'
import Video from './video';
export default class HomeScreen extends React.Component {
                 state = { video: [] };
                 componentDidMount() {
                   if (this.state.video.length==0) {
                   this._fetch();
                     
                   }else{
                     this.randomCountry();
                   }
                  //  this.randomCountry()
                   this.props.navigation.setParams({
                     random: this.randomCountry
                   });
                 }

                 componentWillMount() {
                   try {
                     const result = AsyncStorage.getItem(CONFIG.STORAGE.AVAILABLE_REGIONS).then(
                       result => {
                         if (result) {
                           countries = JSON.parse(result);
                           this.setState({ countries });
                         }
                       }
                     );
                   } catch (e) {
                     console.log(e);
                   }
                 }
                 randomCountry() {
                   // console.log("---------------------------------------->",countries)

                   var randCountry = countries[Math.floor(Math.random() * countries.length)];
                   const countryId = randCountry.id;
                   console.log("randommmm", randCountry.id);
                   const qp = "&part=snippet,id&order=rating&maxResults=20&chart=mostPopular";
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   const videoRandom = [];

                   //  console.log(rdCount)
                   fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regionCode=${countryId}`)
                     .then(res => res.json())
                    
                     .then(res => {
                         console.log("randomCountryVideo", res);                       
                       res.items.forEach(v => {
                        //  console.log("one item",v);
                         videoRandom.push(v);
                       });

                       //  console.log(video);

                       this.setState({ videoRandom });
                        console.log('console', this.state.videoRandom);
                     });
                 }

                 _fetch() {
                   const qp = "&part=snippet,id&order=rating&maxResults=20&chart=";
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   const video = [];
                   //  const rdCount = this.randomCountry(countries)
                   //  console.log(rdCount)
                   fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regioncode=AZ`)
                     .then(res => res.json())

                     .then(res => {
                       //  console.log('res', res);
                       res.items.forEach(v => {
                         // console.log(v);
                         video.push(v);
                       });

                       //  console.log(video);

                       this.setState({ video });
                       //  console.log('console', this.state.video);
                     });
                 }

                 static navigationOptions = ({ navigation }) => {
                   const { state, setParams, navigate } = navigation;
                   return { headerStyle: { backgroundColor: "#f42627" }, headerLeft: <TouchableOpacity>
                         <Image source={require("../assets/logo.png")} style={{ marginLeft: 10 }} />
                       </TouchableOpacity>, headerRight: <View style={{ flexDirection: "row", marginRight: 30 }}>
                         <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => state.params.random()}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/hashtag.png")} />
                         </TouchableOpacity>
                         <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/love.png")} />
                         </TouchableOpacity>

                         <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                           <Image style={{ width: 20, height: 20 }} source={require("../assets/search.png")} />
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
                   const list = this.state.video.map(
                     (item, id) => {
                       return (
                         <View key={id}>
                           <TouchableOpacity
                             onPress={() =>
                               this.props.navigation.navigate(
                                 "video",
                                 {
                                   url: item.id.videoId
                                 }
                               )
                             }
                           >
                             <Image
                               style={{
                                 height: 190,
                                 marginRight: 30,
                                 marginTop: 10,
                                 alignItems: "center",
                                 justifyContent: "center",
                                 marginLeft: 30
                               }}
                               source={{
                                 uri:
                                   item.snippet.thumbnails
                                     .default.url
                               }}
                             />
                             <Text
                               style={
                                 {
                                   backgroundColor: "#FFFFFF",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   marginLeft: 30,
                                   marginRight: 30,
                                   fontWeight: "bold",
                                   fontSize: 15,
                                   marginBottom: 30
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
                       <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={this.randomCountry}>
                         <Image style={{ width: 20, height: 20 }} source={require("../assets/hashtag.png")} />
                       </TouchableOpacity>
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