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
export default class Settings extends React.Component {
    state = {
        countries : [],
        region :""
    }
                //  _fetchCountries() {
                //    const qp = "&part=snippet&hl=es_MX";
                //    const countries =[];
                //    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                //    fetch(`${BASE_URL}/i18nRegions?key=${API_KEY}${qp}`)
                //      .then(res => res.json())

                //      .then(res => {
                //     //    console.log("res", res);
                //        res.items.forEach(c => {
                //          // console.log(v);
                //          countries.push(c);
                //        });

                //       //  console.log(countries);

                //        this.setState({ countries });
                //       //  console.log("console", this.state.countries);
                //      });
                //  }
                 componentDidMount() {

                   const qp = "&part=snippet&hl=es_MX";
                   const listCountries = [];
                   const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
                   
                   fetch(`${BASE_URL}/i18nRegions?key=${API_KEY}${qp}`)
                     .then(res => res.json())

                     .then(res => {
                       //    console.log("res", res);
                       res.items.forEach(c => {
                         // console.log(v);
                         listCountries.push(c);
                       });

                       const str = JSON.stringify(listCountries);
                       //  console.log("console", this.state.countries);
                        console.log("madjid",str);
                         try {
                           AsyncStorage.setItem(CONFIG.STORAGE.AVAILABLE_REGIONS, str);
                         } catch (error) {
                           console.log("madjid", error);
                         }
                     });
                   
                   
                   
                  
                 
                }

                 
                 componentWillMount(){
                 try {
                const result = AsyncStorage.getItem(CONFIG.STORAGE.AVAILABLE_REGIONS).then(
                  result => {
                    if (result) {
                      countries = JSON.parse(result);
                      this.setState({ countries });
                      
                    }
                  }
                );
               
                  }catch(e){


                  } }

                  
                 _setData(itemValue){
                 this.setState({region :itemValue}) 
                  
                 }
                 
                 render() {
                    
                   return <View>
                       <Picker selectedValue={this.state.region} onValueChange={itemValue => this._setData(itemValue)}>
                         {this.state.countries.map(
                           (region, index) => (
                             <Picker.Item
                               key={index}
                               label={region.snippet.name}
                               value={region.snippet.name}
                             />
                           )
                         )}
                       </Picker>
                       <Text>{this.state.region}</Text>
                     </View>;
                 }
               }