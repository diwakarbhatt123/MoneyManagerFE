import React, {Component} from 'react';
import {Text, TextInput, View, Picker, DatePickerAndroid, Button, Alert} from 'react-native';
import {AddExpenseService} from '../../service/AddExpenseService';
import {Expense} from "../../co/Expense";
import DatePicker from "react-native-datepicker";

export default class AddExpense extends Component {
    static navigationOptions = {
        title: 'Add Expense',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'#ff4f10',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            merchant: "Testval1",
            date: new Date(),
            recurring: "",
            amount: 0,
            paidTo: "",
            category: "Testval1"
        };
    }
    expenseAlert() {
        if (this.state.amount !== 0) {
            Alert.alert(
                'Add Expense',
                'Expense add for \ndate: ' + this.state.date + "\nAmount :" + this.state.amount + "\nMerchant :" +
                this.state.merchant + "\ncategory : " + this.state.category,
                [
                    {text: 'Cancel', onPress: () => console.warn('Reminder Cancelled'), style: 'cancel'},
                    {
                        text: 'Confirm', onPress: () => {this.saveCurrentExpense.bind(this),
                            this.props.navigation.navigate('Home'),
                            console.warn("Reminder set successfully")
                        }
                    }
                ]
            );
        }
        else{
            Alert.alert(
                'Add Expense',
                "Amount is 0",
                [
                    {
                        text: 'Okay', onPress: () => {
                            console.warn("Amount is 0")
                        }
                    }
                ]
            );
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
                <Picker selectedValue={this.state.merchant} onValueChange={(itemValue) => {
                    console.log("Selected value is ", itemValue);
                    this.setState({merchant: itemValue});
                }}>
                    <Picker.Item label="Test1" value="Testval1"/>
                    <Picker.Item label="Test2" value="Testval2"/>
                    <Picker.Item label="Test3" value="Testval3"/>
                </Picker>
                <DatePicker title="Select Date" selectedValue={this.state.date} date={this.state.date} onDateChange={(date) => {this.setState({date: date})}}/>
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
                <Picker selectedValue={this.state.category} onValueChange={(itemValue) => {
                    console.log("Selected value is ", itemValue);
                    this.setState({category: itemValue});
                }}>
                    <Picker.Item label="Test1" value="Testval1"/>
                    <Picker.Item label="Test2" value="Testval2"/>
                    <Picker.Item label="Test3" value="Testval3"/>
                </Picker>
                <Button title="Save" onPress={()=>this.expenseAlert()}/>
            </View>
        )
    }
}