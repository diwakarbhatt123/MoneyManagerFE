import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Button,
    Text,
    View,
    Dimensions,
    Picker} from 'react-native';
import PropTypes from 'prop-types';


type Props = {};
export default class Header extends Component<Props> {

    constructor(props,context){
        super(props,context);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{color:"black",fontSize: 14,marginLeft:10}}><Text>{this.props.title}</Text></Text>
                </View>
            </View>
        );
    }
    static propTypes = {
        title:PropTypes.string
    }
    static defaultProps = {
        title: 'Money'
    }
}


const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff0e9'
    },
    header: {
        top:0,
        justifyContent: 'center',
        height:40,
        width:Dimensions.get('window').width,
        backgroundColor: '#ff4f10'
    }
});
