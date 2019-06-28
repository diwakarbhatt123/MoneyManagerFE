/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    TextInput,
    Button,
    Text,
    View,
    Dimensions,
    Picker,Alert } from 'react-native';
import Header from "../Common/Header";


var FloatingLabel = require('react-native-floating-labels');
type Props = {};
export default class AddReminder extends Component<Props> {

    static navigationOptions = {
        title: 'Add Reminder',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'#ff4f10',
        },
    };

    constructor(props,context){
        super(props,context);

        this.state = {
            reminderId:"fc-fgh35262",
            amount: "1200",
            merchant:"Freecharge",
            message:"",
            isValidated: false,
            interval:"daily"
        }

    }
    updateInputValue(e){
        this.setState({
            amount: e.target.value,
        });
    }
    reminderAlert() {
        if(this.state.reminderId!=='' && this.state.amount !== "" && this.state.merchant !== ""){
            this.setState({isValidated: true});
            Alert.alert(

                'Reminder',
                'Reminder set for \nRepeat mode : '+this.state.interval+"\nAmount :"+this.state.amount+"\nMerchant :" +
                this.state.merchant+"\nMessage : "+this.state.message,
                [
                    {text: 'Cancel', onPress: () => console.warn('Reminder Cancelled'), style: 'cancel'},
                    {text: 'Confirm', onPress:() =>{this.props.navigation.navigate('Home'),console.warn("Reminder set successfully")}}
                ]
            );
        }else{
            this.setState({isValidated: false});
        }

    }



    render() {
        return (
            <View style={styles.container}>

                <Text
                    labelStyle={styles.labelTitle}
                    style={{alignContent: 'flex-start',margin:20,color:'black'}}
                    inputStyle={styles.labelInput}
                >Reminder Id :{this.state.reminderId}</Text>
                <Picker
                    selectedValue={this.state.interval}
                    style={{height: 60, width: 150,textColor:'#FF33D1'}}
                    onValueChange={(itemValue) =>
                        this.setState({interval: itemValue})
                    }>
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Montly" value="monthly" />
                    <Picker.Item label="Yearly" value="yearly" />
                </Picker>
                <FloatingLabel
                    labelStyle={styles.labelTitle}
                    inputStyle={styles.labelInput}
                    style={{alignItems: 'center'}}
                    value={this.state.amount}
                    onChangeText={(value)=>this.setState({amount:value})}
                >Amount</FloatingLabel>
                <FloatingLabel
                    labelStyle={styles.labelTitle}
                    inputStyle={styles.labelInput}
                    style={{alignItems: 'center'}}
                    value={this.state.merchant}
                    onChangeText={(value)=>this.setState({merchant:value})}
                > Merchant</FloatingLabel>
                <FloatingLabel
                    labelStyle={styles.labelTitle}
                    inputStyle={styles.labelInput}
                    style={{alignItems: 'center'}}
                    value={this.state.message}
                    onChangeText={(value)=>this.setState({message:value})}
                >Message</FloatingLabel>

                <View style={styles.buttonReminder}>
                    <Button onPress={() => {this. reminderAlert()}} title="Submit"  />
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbf9ff',
        height: Dimensions.get("window").height,
    },
    welcome: {
        flex:1,
        flexDirection:'column',
        fontSize: 20,
        textAlign: 'center',
        width:105,
        backgroundColor:'#2529ff',
        margin: 10
    },
    picker: {
        flex:3,
        fontSize: 20,
        textAlign: 'center',
        width:105,
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonReminder: {
        flex:4,
        marginBottom:10,
        fontSize: 20,
        margin:20,
        textAlign: 'center',
    },
    labelTitle: {
        fontSize: 17,
        includeFontPadding: false,
        lineHeight: 18,
        color:'black'
    },
    labelInput: {

        fontSize: 17,
        includeFontPadding: false,
        lineHeight: 10,
        width:150,
    },
});
