import React, { Component } from 'react';
import { AppRegistry,TouchableOpacity, View, StyleSheet, ScrollView, Image, LayoutAnimation, Text,TextInput,Alert} from 'react-native';
import Item from '../Item.js'

export default class SplitExpense extends Component {

    constructor() {
        super();
        this.state = { valueArray: [],
            disabled: false ,
            vpas:[],
            amt : "Split amount : Rs " +0
        }
        this.addNewEle = false;
        this.index = 1;
        this.amount="Total amount : Rs "+"400";
        this.totalAmount = 400;
        this.divisors = 1;
        this.individualAmount=0;
    }

    afterAnimationComplete = () => {
        this.index += 1;
        this.divisors += 1;
        this.setState({ disabled: false });
        this.individualAmount = (this.amount/(this.divisors+1)).toFixed(2);
       // Alert.alert(JSON.stringify(this.state.valueArray));
    }

    populateAmount = () => {


    }

    addMore = () => {
        this.addNewEle = true;
        const newlyAddedValue = { id: "id_" + this.index, users: this.index + 1, amt: (this.amount/(this.divisors+1)).toFixed(2)};

        this.setState({
            disabled: true,
            amt: "Split amount : Rs. "+(this.totalAmount/(this.divisors+1)).toFixed(2),
            valueArray: [...this.state.valueArray, newlyAddedValue]
        });

    }

    createCollectRequests = () => {
       // Alert.alert("Submit Button Clicked");
        Alert.alert("Collect requests raised successfully!")
        //Alert.alert(JSON.stringify(this.state.valueArray[1]))
        //Alert.alert("Collect request raised successfully")

    }

    remove(id) {
        this.addNewEle = false;
        this.divisors -= 1;
        this.individualAmount = (this.amount/(this.divisors+1)).toFixed(2);
        const newArray = [...this.state.valueArray];
        newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

        this.setState(() => {
            return {
                amt: "Split amount : Rs. "+(this.totalAmount/(this.divisors)).toFixed(2),
                valueArray: newArray
                /*valueArray: newArray,
                amt: "Split amount : Rs. "+(this.totalAmount/(this.divisors+1)).toFixed(2)*/

            }
        }, () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        },);
    }

    render() {
        return (
            <View style={styles.container} >

                <TextInput
                           style = {styles.input}
                           //underlineColorAndroid = "transparent"
                           //placeholder = "1000"
                           //placeholderTextColor = "#9a73ef"
                           //autoCapitalize = "none"
                           value = {this.amount}
                           editable = {false}
                           contextMenuHidden={true}
                           //fontWeight: "bold"
                          // onChangeText = {this.handleEmail}
                />
                <TextInput
                    style = {styles.input}
                    value = {this.state.amt}
                    editable = {false}

                />

                <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    onContentSizeChange={() => {
                        this.addNewEle && this.scrollView.scrollToEnd();
                    }}
                >
                    <View style={{ flex: 1, padding: 4 }}>
                        {this.state.valueArray.map(ele => {
                            return (
                                <Item
                                    key={ele.id}
                                    item={ele}
                                    removeItem={(id) => this.remove(id)}

                                    afterAnimationComplete={this.afterAnimationComplete}
                                    populateAmount={this.populateAmount}
                                />
                            )
                        })}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addBtn}
                    disabled={this.state.disabled}
                    onPress={this.addMore}
                >
                    <Image source={require('../../images/addButton.png')} style={styles.btnImage} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submitBtn}
                    disabled={this.state.disabled}
                    onPress={this.createCollectRequests}

                >
                    <Image source={require('../../images/submitButton.png')} style={styles.btnImage} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        addBtn: {
            position: 'absolute',
            right: 25,
            bottom: 25,
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'white'
        },
        submitBtn: {
            position: 'absolute',
            left: 160,
            bottom: 25,
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'white'
        },
        btnImage: {
            resizeMode: 'contain',
            width: '100%',

        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        input: {
            margin: 15,
            height: 40,
            borderColor: 'black',
            //textAlign: 'center',
            borderWidth: 1,
            fontSize: 18,
            fontWeight: 'bold',
        },
        title: {
            margin: 15,
            height: 40,
            borderColor: 'black',
            textAlign: 'center',
            color: '#000000',
            borderWidth: 1,
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: '#ff1a2b'
        },


    });