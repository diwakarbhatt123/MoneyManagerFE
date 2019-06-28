/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,} from 'react-native';
import AddReminder from './component/addReminder/AddReminder';
import {createStackNavigator} from 'react-navigation';
import Home from "./component/Common/Home";



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class App extends Component<Props> {


  constructor(props) {
    super(props);
  }

  render() {

    //const {navigate}=this.props.navigation;
    return (
        <AppNavigators/>
    );
  }
}
  const AppNavigators = createStackNavigator({
    Home: Home,
    Reminder: AddReminder,
  })


