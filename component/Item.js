import React, { Component } from 'react';
import {
    Animated,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    UIManager,
    TextInput,
    View
} from 'react-native';


const width = Dimensions.get('window').width;

export default class Item extends Component {

    constructor() {
        super();
        this.animatedValue = new Animated.Value(0);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.handleVpaInput = this.handleVpaInput.bind(this);
        this.state = {
            TextInputValue: ''
        }
    }

    handleVpaInput = (event = {}) => {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;

        this.setState();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item.id !== this.props.item.id) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0.5,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.afterAnimationComplete();
        });
    }

    removeItem = () => {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.removeItem(this.props.item.id);
        });
    }

    render() {
        const {newValue, height} = this.state;

        const translateAnimation = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-width, 0, width]
        });

        const opacityAnimation = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });

        return (
            <Animated.View style={[
                styles.viewHolder, {
                    transform: [{ translateX: translateAnimation }],
                    opacity: opacityAnimation
                }]}
            >
               {/* <Text
                    style={styles.displayText}>
                    Rs. {this.props.item.amt}
                </Text>*/}
                {/*<TextInput style = {styles.amount}
                           underlineColorAndroid = "transparent"

                    //placeholder = "1000"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           value = "1000"
                           editable = {false}
                           contextMenuHidden={true}

                    //fontWeight: "bold"
                    // onChangeText = {this.handleEmail}
                />*/}
               {/* <TextInput
                    style = {styles.vpa}
                           underlineColorAndroid = "transparent"
                           placeholder = "Enter VPA"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           value = ""
                           //editable = {false}
                           contextMenuHidden={true}
                           multiline={true}
                           maxLength={40}

                />*/}
                <TextInput
                    style={styles.vpa}
                    // Adding hint in TextInput using Placeholder option.
                    placeholder=" Enter VPA"
                    //set the value in state.
                   // onChangeText={TextInputValue => this.setState({TextInputValue})}
                    // Making the Under line Transparent.
                    underlineColorAndroid="transparent"
                    contextMenuHidden={true}
                />
               {/* <TextInput
                    //style={styles.vpa}
                    // Adding hint in TextInput using Placeholder option.
                    placeholder=" Enter VPA"
                    //set the value in state.
                    // onChangeText={TextInputValue => this.setState({TextInputValue})}
                    // Making the Under line Transparent.
                    underlineColorAndroid="transparent"
                />*/}

                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.removeItem}
                >
                    <Image
                        source={require('../images/deleteButton.png')}
                        style={styles.btnImage}
                    />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create(
    {
        viewHolder: {
            paddingVertical: 15,
            backgroundColor: '#f3761d',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 4,
            paddingLeft: 15,
            borderRadius: 10
        },
        displayText: {
            color: 'black',
           // fontSize: 20,
            alignItems: 'center',
            paddingRight: 17,
            margin: 15,
            height: 40,
            borderColor: 'black',
            //textAlign: 'right',
            borderWidth: 1,
            fontSize: 18,
            fontWeight: 'bold',
        },
        removeBtn: {
            position: 'absolute',
            right: 13,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        btnImage: {
            resizeMode: 'contain',
            width: '100%',
        },
        label: {
            flex: 1,
            fontWeight: 'bold'
        },
        inputCvv: {
            flex: 1,
            backgroundColor: '#6fa511',

        },
        amount: {
            margin: 15,
            height: 40,
            borderColor: 'black',
            textAlign: 'left',
            borderWidth: 1,
            fontSize: 18,
            fontWeight: 'bold',

            paddingLeft: 5,
            flexDirection: "row",
        },
        vpa: {
            margin: 15,
            height: 40,
            borderColor: 'white',
            //textAlign: 'right',
            borderWidth: 0,
            fontSize: 18,
            fontWeight: 'bold',
        },
    });