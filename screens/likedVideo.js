import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  HeaderButtons,
  Ionicons,
  Picker,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import { CONFIG } from "../constants/index";
import HomeScreen from "./home";
export default class LikedVideo extends React.Component {

                 componentWillMount() {
                   
  
                    try {

                      const result = AsyncStorage.getItem("LikedVid").then(
                        
                        result => {
                          // console.log(result);
                          
                          if (result) {
                            
                            liked = JSON.parse( result );
                          //  this.setState.likedVideo.push(liked)
                            
                            // 
                            // tmpLoved=this.state.likedVideo
                            // console.log(liked);
                           
                            
                          }
                          this.setState({
                             likedVideo: liked
                           });
                          // const tmpLoved = likedVideo;
                          // console.log(tmpLoved);
                           
                          console.log(this.state.likedVideo);
                          // console.log(this.state.likedVideo.length);
                          
                        }
                      );
                    } catch (e) {
                      console.log(e);
                    }
                  }
  render(){

    
  //  const list = this.state.likedVideo.map((item, id) => {
  //    return <View key={id}>
  //        <TouchableOpacity onPress={() => this.props.navigation.navigate(
  //              "video",
  //              {
  //                url: item.id.videoId
  //              }
  //            )}>
  //          <Image style={{ height: 190, marginRight: 30, marginTop: 10, alignItems: "center", justifyContent: "center", marginLeft: 30 }} source={{ uri: item.snippet.thumbnails.default.url }} />
  //          <Text style={{ backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", marginLeft: 30, marginRight: 30, fontWeight: "bold", fontSize: 15, marginBottom: 30 } //  fontFamily: "roboto",
  //            }>
  //            {item.snippet.title}
  //          </Text>
  //        </TouchableOpacity>
  //      </View>;
  //  });

    return <View>
    <Text>not FInished</Text>
      </View>;
  }
  
}