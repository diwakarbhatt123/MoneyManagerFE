/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Text, View, Button, StyleSheet,TouchableOpacity,Image} from 'react-native';


type Props = {};


export default class Home extends Component<Props> {
    static navigationOptions = {
        title: 'Money Manager',
        headerLeft: null,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'#ff4f10',
        },
    };

    constructor (props) {
        super(props);
        this.state= {
            disabled: true,
        }


    }

    render() {

        //const {navigate}=this.props.navigation;
        return (

            <View>
                <Text>  </Text>
                <Button  title={"Add Reminder"} onPress={()=>this.props.navigation.navigate('Reminder')}/>
                <Text>  </Text>
                <Button title={"Add Expense"} onPress={()=>this.props.navigation.navigate('Expense')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#0f3888'
    },

    btnImage: {
        resizeMode: 'contain',
        width: '100%',

    },

});
