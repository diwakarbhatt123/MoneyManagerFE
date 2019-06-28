import React, { Component } from "react";
import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, Dimensions } from "react-native";

export default class SplitExpense extends Component {

    FloatingButtonEvent=()=>{
        Alert.alert("Floating Button Clicked");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}> Floating Button Example </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#e5e5e5",
        alignItems: "center",
        height: Dimensions.get("window").height,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },

});