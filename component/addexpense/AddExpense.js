import React, {Component} from 'react';
import {Text, TextInput, View, Picker, DatePickerAndroid, Button} from 'react-native';
import {AddExpenseService} from '../../service/AddExpenseService';
import {Expense} from "../../co/Expense";

export default class AddExpense extends Component {
    state = {
        merchant: "",
        date: new Date(),
        recurring: "",
        amount: 0,
        paidTo: "",
        category: ""
    };

    selectDate() {
        this.openDatePicker().then((date) => {
            this.setState({date: date});
        }).catch((err) => {
            console.warn('Cannot open date picker ', err);
        });
    }

    async openDatePicker() {
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date(), maxDate: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
            return new Date(year, month, day);
        }
    }

    saveCurrentExpense() {
        let expense = new Expense(this.state.merchant, this.state.date, this.state.amount, this.state.paidTo, this.state.category, this.state.recurring);
        let addExpenseService = new AddExpenseService();
        console.log("Called saved expense ", expense);
        let response = addExpenseService.saveExpense(expense);
        if (response === null) {
            alert("Could not save expense. Please try again.");
        } else {

        }
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.state.merchant} onValueChange={(itemValue, itemIndex) => {
                    console.log("Selected value is ", itemValue);
                    this.setState({merchant: itemValue});
                }}>
                    <Picker.Item label="Test1" value="Testval1"/>
                    <Picker.Item label="Test2" value="Testval2"/>
                    <Picker.Item label="Test3" value="Testval3"/>
                </Picker>
                <Button title="Select Date" onPress={this.selectDate}/>
                <Picker selectedValue={this.state.recurring} onValueChange={(itemValue, itemIndex) => {
                    console.log("Select recurring ", itemValue);
                    this.setState({recurring: itemValue});
                }}>
                    <Picker.Item label="Non Recurring" value="Non Recurring"/>
                    <Picker.Item label="Daily" value="Daily"/>
                    <Picker.Item label="Monthly" value="Monthly"/>
                    <Picker.Item label="Yearly" value="Yearly"/>
                </Picker>
                <Text>Amount</Text>
                <TextInput keyboardType="numeric" onChangeText={(text) => {
                    console.log("Amount changed ", text);
                    this.setState({amount: text});
                }}/>
                <Text>Paid To</Text>
                <TextInput onChangeText={(text) => {
                    console.log("Paid to changed ", text);
                    this.setState({paidTo: text});
                }}/>
                <Text>Category</Text>
                <TextInput onChangeText={(text) => {
                    console.log("Category changed ", text);
                    this.setState({category: text})
                }}/>
                <Button title="Save" onPress={this.saveCurrentExpense}/>
                <Button title="Save And Add Another" onPress={this.saveCurrentExpense}/>
            </View>
        )
    }
}