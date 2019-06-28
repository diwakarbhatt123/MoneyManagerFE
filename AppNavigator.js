import { createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import Home from './component/Home';
import Basic from './component/CategoryTransactionList';
import {Image} from 'react-native' ;
import ParallaxDemo from'./component/ParallelCategoryList';

export const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
//      headerTitle: (
//            <Image style={{ alignSelf: 'center' , width: 30, height: 39 }} source={require('./Images/logo.png')}/>
//        ),
      title: 'Money Manager',
      headerLeft : null,
       headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#E3714D'
          },

    }
  },
  CategoryListScreen: {
    screen: Basic,
    navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.category}`,
        }),
    }
  },
 {
    mode: 'modal'
  });
export const AppContainer = createAppContainer(AppNavigator);
