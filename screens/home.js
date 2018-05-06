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
  AsyncStorage,
  TextInput
} from "react-native";
import { StackNavigator } from "react-navigation";
import {CONFIG} from '../constants/index';
import { Icon } from 'react-native-elements'
import Video from './video';
export default class HomeScreen extends React.Component {
                 state = { video: [], Country: "France", search: false, textSearch: null, countryTrend : false
                 };
                 componentDidMount() {
                   this._fetch();
                   this.props.navigation.setParams({
                     random: this.randomCountry,
                     search: this._search
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
                 _fetchForSearch = () => {
                   const qb = "&part=snippet,id&order=rating&maxResult=5&q=";

                   fetch(`${CONFIG.YOUTUBE.BASE_URL}/search?key=${CONFIG.YOUTUBE.API_KEY}${qb}${this.state.textSearch}`)
                     .then(res => res.json())
                     .then(res => {
                       const videos = [];
                       res.items.forEach(v => {
                         videos.push(v);
                       });
                       this.setState({ video: videos });
                     })
                     .catch(error => {
                       console.error(error);
                     });
                 };

                 _search = () => {
                   // this.setState({check: !this.state.search})

                    // console.log(this.state.search);
                   this.setState(prevState => ({
                     search: !prevState.search,
                     countryTrend: !prevState.countryTrend
                   }));
                 };
                 _toggleSearch() {
                  //  console.log("toooooz", this.state.search);
                   if (this.state.search) {
                     return <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} onChangeText={textSearch => this.setState(
                             { textSearch }
                           )} value={this.state.textSearch} onEndEditing={() => this._fetchForSearch()} />;
                   }
                 }

                 _toggleTrend(){
                       
                       if (this.state.countryTrend == false) {
                        return(<Text style={styles.trend}>
                           {" "}
                           Trends in {this.state.Country}
                         </Text>)
                       }
                 }

                 randomCountry = () => {
                   // console.log("---------------------------------------->",countries)

                   this.setState({ video: [], Country: "" });

                   var randCountry = countries[Math.floor(Math.random() * countries.length)];
                   const countryId = randCountry.id;
                   // console.log("randommmm", randCountry);
                   const countryName = randCountry.snippet.name;
                  //  console.log(countryName);
                   const qp = "&part=snippet,id&order=rating&maxResults=20&chart=mostPopular";
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   const videoRandom = [];

                   //  console.log(rdCount)
                   fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regionCode=${countryId}`)
                     .then(res => res.json())

                     .then(res => {
                       //  console.log("randomCountryVideo", res);
                       res.items.forEach(v => {
                         //  console.log("one item",v);
                         videoRandom.push(v);
                       });
                      //  console.log("console--------------------____>");
                      //  console.log("console--------------------____>");
                       // console.log(videoRandom);
                       // console.log("console--------------------____>", this.state.video);
                      //  console.log("console--------------------____>");
                      //  console.log("console--------------------____>");
                       //  console.log(this.state.video);

                       this.setState({
                         video: videoRandom,
                         Country: countryName
                       });
                       // console.log('console--------------------____>', this.state.video);
                     });
                 };

                 _fetch() {
                   const qp = "&part=snippet,id&order=rating&maxResults=20&chart=mostPopular";
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   const videos = [];

                   fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regionCode=FR`)
                     .then(res => res.json())

                     .then(res => {
                       res.items.forEach(v => {
                         videos.push(v);
                       });

                       this.setState({ video: videos,
                     
                      });
                       //  console.log(this.state.video);
                      //  console.log("console", this.state.countryTrend);
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

                         <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => state.params.search()}>
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
                       {this._toggleSearch()}
                       {this._toggleTrend()}

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