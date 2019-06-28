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
    Picker } from 'react-native';
import Header from "../Common/Header";


var FloatingLabel = require('react-native-floating-labels');
type Props = {};
export default class App extends Component<Props> {

    constructor(props,context){
        super(props,context);

        this.state = {
            reminderId:"123456789",
            amount: "1200",
            merchant:"Freecharge",
            message:"",
            isValidated: false,
            interval:"daily"
        }
    }

    _displayResult(){
        console.log('Button has been pressed');
        if(this.reminderId!=='' && this.state.amount !== "" && this.state.merchant !== ""){
            this.setState({isValidated: true});
        }else{
            this.setState({isValidated: false});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="Reminder"/>
                <Text
                    labelStyle={styles.labelTitle}
                    style={{alignContent: 'flex-start',margin:20,color:'black'}}
                    inputStyle={styles.labelInput}
                >Reminder Id :{this.state.reminderId}</Text>
                <Picker
                    selectedValue={this.state.interval}
                    style={{height: 40, width: 100,textColor:'#FF33D1'}}
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
                    onValueChange={(value)=>this.state({amount:value})}
                >Amount</FloatingLabel>
                <FloatingLabel
                    labelStyle={styles.labelTitle}
                    inputStyle={styles.labelInput}
                    style={{alignItems: 'center'}}
                    value={this.state.merchant}
                    onValueChange={(value)=>this.state({merchant:value})}
                > Merchant</FloatingLabel>
                <FloatingLabel
                    labelStyle={styles.labelTitle}
                    inputStyle={styles.labelInput}
                    style={{alignItems: 'center'}}
                    value={this.state.message}
                    onValueChange={(value)=>this.state({message:value})}
                >Message</FloatingLabel>

                <View style={styles.buttonReminder}>
                    <Button onPress={() => {this. _displayResult()}} title="Submit"  />
                </View>

                <View style={styles.buttonReminder}>
                    <Text style={styles.mTextColor}> {this.state.isValidated ? this.state.amount + " " +  this.state.merchant : "" } </Text>
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
