import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Platform, Picker } from 'react-native';
import SortableList from 'react-native-sortable-list';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');
const deviceId = DeviceInfo.getDeviceId();


//const data = {
//  0: {
//    image: 'https://placekitten.com/200/240',
//    text: 'Chloe',
//  },
//  1: {
//    image: 'https://placekitten.com/200/201',
//    text: 'Jasper',
//  },
//  2: {
//    image: 'https://placekitten.com/200/202',
//    text: 'Pepper',
//  },
//  3: {
//    image: 'https://placekitten.com/200/203',
//    text: 'Oscar',
//  },
//  4: {
//    image: 'https://placekitten.com/200/204',
//    text: 'Dusty',
//  },
//  5: {
//    image: 'https://placekitten.com/200/205',
//    text: 'Spooky',
//  },
//  6: {
//    image: 'https://placekitten.com/200/210',
//    text: 'Kiki',
//  },
//  7: {
//    image: 'https://placekitten.com/200/215',
//    text: 'Smokey',
//  },
//  8: {
//    image: 'https://placekitten.com/200/220',
//    text: 'Gizmo',
//  },
//  9: {
//    image: 'https://placekitten.com/220/239',
//    text: 'Kitty',
//  },
//};

export default class Basic extends Component {

    constructor(){
        super()
        this.state= {
                dataSource: [] ,
                PickerSelectedVal : ''
        }
   }
   componentDidMount() {
               const url = "http://www.json-generator.com/api/json/get/bVrtVbWDxe?indent=2";
               fetch(url).then((response)=>response.json())
                         .then((responseJson)=> {
                           this.setState({
                             dataSource : responseJson.data
                           })
                          })
                          .catch((error)=> {
                            console.log(error);
                          })
//fetch('https://mywebsite.com/endpoint/transactions/groupByCategory', {
//  method: 'POST',
//  headers: {
//    Accept: 'application/json',
//    'Content-Type': 'application/json',
//  },
//  body: JSON.stringify({
//    userId: 'yourValue',
//    deviceId: deviceId,
//    month : 'yourOtherValue',
//    year : 'yourOtherValue',
//  }),
//}).then((response) => response.json())
//    .then((responseJson) => {
//      this.setState({
//                                   dataSource : responseJson.data
//                                 })
//    })
//    .catch((error) => {
//      console.error(error);
//    });
          }
  render() {
    return (
      <View style={styles.container}>
        <Picker style={{height: 60, width: 190,textColor:'#FF33D1'}}
                   selectedValue={this.state.PickerSelectedVal}
                   onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})} >
                   <Picker.Item label="JAN, 2019" value="01" />
                   <Picker.Item label="FEB, 2019" value="02" />
                   <Picker.Item label="MAR, 2019" value="03" />
                   <Picker.Item label="APR, 2019" value="04" />
                   <Picker.Item label="JUN, 2019" value="05" />
                   <Picker.Item label="JAN, 2019" value="06" />

        </Picker>


        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    );
  }

  _renderRow = ({key,index,data, active}) => {
  console.log('active',index);
    return <CategoryTransactionList data={this.state.dataSource[index]} active={active}/>
  }
}

class CategoryTransactionList extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data} = this.props;
    console.log('data is',data);
    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Icon name='rowing' style={{ fontSize: 100, color: '#08c' }} />
        <Text style={styles.text}>{data.userId}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 8,
    borderRadius: 10,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width,
        elevation: 0,
        marginHorizontal: 10,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});