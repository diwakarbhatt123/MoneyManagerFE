import {createAppContainer,createStackNavigator} from 'react-navigation';
import AddReminder from "../addReminder/AddReminder";
import App from "../../App";
import{AppRegistry} from 'react-native';

const  AppNavigators = createStackNavigator({
    Home: {screen: App},
    Reminder: {screen: AddReminder},

},{
    initialRouteName:App,
});
const screen=createAppContainer(AppNavigators);
AppRegistry.registerComponent('flow',()=>AppNavigators);