/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component} from 'react'
import { Platform ,ScrollView, StatusBar, Dimensions, Text,StyleSheet } from 'react-native'
import ReactMinimalPieChart from './ReactMinimalPieChart';
import {Path} from 'react-native-svg';


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
render() {
    return (
<ReactMinimalPieChart
      data={[
          {
            title: 'One',
            value: 10,
            color: '#E38627',
            category: 'Shopping'
          },
          {
            title: 'Two',
            value: 15,
            color: '#C13C37',
            category: 'Travel'
          },
          {
            title: 'Three',
            value: 20,
            color: '#6A2135',
            category: 'Bill'
          }
        ]}
        label={({ data, dataIndex }) =>
                Math.round(data[dataIndex].percentage) + '%'
        }
        style={{height: '80px'}}
        segmentsStyle={{ transition: 'stroke .3s' }}
          labelStyle={{
            fontSize: '5px',
            fontFamily: 'sans-serif',
            fill: '#121212',
          }}
          {...this.props}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

