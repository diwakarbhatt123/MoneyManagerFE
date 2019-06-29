import React, {Component} from 'react';
import axios from "axios";
import {sendPost} from "./HttpSender"
import {Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Platform, Picker} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Icon from 'react-native-ionicons';
import DeviceInfo from 'react-native-device-info';


const deviceId = DeviceInfo.getDeviceId();


export default class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path: '',

        }
    }

    render() {
        const {navigation} = this.props;
        //var category=navigation.getParam('category');
        // console.log('fhfhfh',navigation.getParam('category'));
        //category="../../images/"+category+".png";

        return (
            <View style={styles.container}>

                <Image
                    resizeMode="cover"
                    style={styles.cover}
                    source={require('../../images/Dining.png')}
                />
                <Icon onPress={() => this.props.navigation.navigate('SplitExpense')} style={styles.icon}
                      name="ios-close-circle" size={60}/>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        margin: 5,
        marginTop: -50,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    cover: {
        width: 330,
        height: 360,
        marginLeft: 15,
        marginTop: 60
    },
    icon: {
        margin: 5,
        position: "absolute",
        top: 90,
        right: 120,
        width: 70,
        height: 70,
        color: "white"
    }
});