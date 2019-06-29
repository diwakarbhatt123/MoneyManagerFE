/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component} from 'react'
import { Platform ,ScrollView, StatusBar, Dimensions, Text,StyleSheet ,View ,Image} from 'react-native'
import ReactMinimalPieChart from './ReactMinimalPieChart';
import {Path} from 'react-native-svg';
import Icon from 'react-native-ionicons';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const data = [
  { title: 'Seoul', value: 21500000, color: 'rgba(131, 167, 234, 1)' },
  { title: 'Toronto', value: 2800000, color: '#F00' },
  { title: 'Beijing', value: 527612, color: 'red' }
]
type Props = {};
export default class Home extends Component<Props> {

constructor(props){
        super(props)
        this.state= {
                dataSource: [] ,
                data: [] ,

        }

   }

//componentWillMount() {
//               fetch('https://ext-qamobile1-aws1.freecharge.in/hoh/api/transactions/groupByCategory', {
//                     method: 'POST',
//                     headers: {
//                       Accept: 'application/json',
//                       'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                       userId: 123456,
//                       deviceId: 123456,
//                       month :  '06',
//                       year : '2019',
//                     }),
//                   }).then((response) => response.json())
//                       .then((responseJson) => {
//                       //console.log(' Response is :',responseJson);
//                       var mData =  [
//                                                                                                          {
//                                                                                                            title: 'One',
//                                                                                                            value: responseJson.data[0].totalAmount,
//                                                                                                            color: '#E38627',
//                                                                                                            category: responseJson.data[0].totalAmount
//                                                                                                          },
//                                                                                                          {
//                                                                                                            title: 'Two',
//                                                                                                            value: responseJson.data[1].totalAmount,
//                                                                                                            color: '#C13C37',
//                                                                                                            category: 'Travel'
//                                                                                                          },
//                                                                                                          {
//                                                                                                            title: 'Three',
//                                                                                                            value: 20,
//                                                                                                            color: '#6A2135',
//                                                                                                            category: 'Bill'
//                                                                                                          }
//                                                                                                        ]
//                         this.setState({
//                                                      dataSource : responseJson.data,
//                                                      data : mData
//                                                    })
//                                                    console.log(' fffffffffffffff',this.state.dataSource[1].totalAmount);
//                       })
//                       .catch((error) => {
//                         console.error(error);
//                       });
//}
render() {
//const { navigation } = this.props;
console.log(' rende is called',Dimensions.get("window").width);
    return (
//    <View>

//<ReactMinimalPieChart
//      data= {this.state.data}
////        data : {dataSource}
//        label={({ data, dataIndex }) =>
//                Math.round(data[dataIndex].percentage) + '%'
//        }
//        style={{height: '20px'}}
//        segmentsStyle={{ transition: 'stroke .3s' }}
//          labelStyle={{
//            fontSize: '5px',
//            fontFamily: 'sans-serif',
//            fill: '#121212',
//          }}
//          {...this.props}
//        />
//        <Text>
//        HIIIIII
//        </Text>
//        </View>
        <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.cover}
          source={require('../../images/Circle.jpg')}

        />
        <Icon onPress={() => this.props.navigation.navigate('Travel',{ category: 'Travel' })} style={styles.close} name="ios-close-circle" size={60} />
        <Icon onPress={() => this.props.navigation.navigate('CategoryListScreen',{ category: 'Dining' })} style={styles.close1} name="ios-close-circle" size={40} />
        <Image
                  resizeMode="cover"
                  style={styles.cover1}
                  source={require('../../images/Top5.png')}
                />

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop : -50,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  cover: {
    flex: 1,
    width: 390,
    height: 520,
    borderRadius: 5,
    marginTop : 0
  },
  cover1: {
      width:380,
      height: 340,
     marginLeft : 15,
     marginTop : 30
  },
  close: {
    margin: 5,
    position: "absolute",
    top: 50,
    left: 180,
    width: 80,
    height: 50,
    color: "#dbb61f"
  },
  close1: {
      margin: 5,
      position: "absolute",
      top: 218,
      left: 240,
      width: 70,
      height: 70,
      color: "#004882"
    }
});

