/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Text, View,Button,} from 'react-native';

type Props = {};


export default class Home extends Component<Props> {
    static navigationOptions = {
        title: 'Freecharge Money Manager',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'#ff4f10',
        },
    };

    constructor (props) {
        super(props);
    }

    render() {

        //const {navigate}=this.props.navigation;
        return (

            <View>
                <Button title={"Add Reminder"} onPress={()=>this.props.navigation.navigate('Reminder')}/>
            </View>
        );
    }
}
