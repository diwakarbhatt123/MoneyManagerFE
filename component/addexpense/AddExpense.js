import React, { Component } from 'react';
import { Text, TextInput, View, Picker, DatePickerAndroid, Button } from 'react-native';

export default class AddExpense extends Component {
    async selectDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });
            console.log("action is ",action);
            if (action !== DatePickerAndroid.dismissedAction) {
                console.log("Selected date is ",year,month,day);
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    saveExpense(){
        console.log("Expense Saved");
    }
    render() {
        return (
            <View>
            <Picker>
                <Picker.Item label="Test1" value="Testval1"/>
                <Picker.Item label="Test2" value="Testval2"/>
                <Picker.Item label="Test3" value="Testval3"/>
            </Picker>
                <Button title="Select Date" onPress={this.selectDate}/>
                <Picker>
                    <Picker.Item label="Non Recurring" value="Non Recurring"/>
                    <Picker.Item label="Daily" value="Daily"/>
                    <Picker.Item label="Monthly" value="Monthly"/>
                    <Picker.Item label="Yearly" value="Yearly"/>
                </Picker>
                <Text>Amount</Text>
                <TextInput keyboardType="numeric"/>
                <Text>Paid To</Text>
                <TextInput />
                <Text>Category</Text>
                <TextInput />
                <Button title="Save" onPress={this.saveExpense}/>
            </View>
        );
    }
}