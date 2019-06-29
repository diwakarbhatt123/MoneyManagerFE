import {createStackNavigator, createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import Home from './component/dashboard/Home';
import Basic from './component/dashboard/CategoryTransactionList';
import AddReminder from './component/addReminder/AddReminder';
import AddExpense from './component/addexpense/AddExpense';
import Travel from './component/dashboard/Travel';
import TermsAndConditions from './component/permissions/TermsAndConditions';
import PushSms from './component/pushsms/PushSms';

export const AppNavigator = createStackNavigator({

    TermsAndConditions: {
        screen: TermsAndConditions,
        navigationOptions: {
            title: 'Terms and Conditions',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#E3714D'
            }
        }
    },
    PushSms: {
        screen: PushSms,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Money Manager',
            headerLeft: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#E3714D'
            },

        }
    },
    CategoryListScreen: {
        screen: Basic,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.category}`,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#E3714D'
            },
        }),
    },
    Reminder: {
        screen: AddReminder,
        navigationOptions: {
            title: 'Add Reminder',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#E3714D'
            },

        }
    },
    Expense: {
        screen: AddExpense,
        navigationOptions: {
            title: 'Add Expense',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#E3714D'
            },

        }

    }
Travel: {
                     screen: Travel,
        navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.category}`,
              headerTintColor: 'white',
                        headerStyle: {
                          backgroundColor: '#E3714D'
                        },
            }),
        },
  });
export const AppContainer = createAppContainer(AppNavigator);
