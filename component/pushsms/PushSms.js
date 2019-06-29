import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {SmsInfo} from "../../co/SmsInfo";
import DeviceInfo from 'react-native-device-info';
import {SmsPushService} from "../../service/SmsPushService";
import * as Progress from 'react-native-progress'
import {CacheManager} from '../../cache/CacheManager';
import NetInfo from "@react-native-community/netinfo";

export default class PushSms extends Component {

    state = {progress: 0.0};

    smsPushService = new SmsPushService();
    cacheManager = new CacheManager();

    componentDidMount() {
        console.log("Component did mount called");
        let filter = {};
        this.setState({progress: 0.2});
        SmsAndroid.list(JSON.stringify(filter), (fail) => {
            console.log("Error occurred while fetching sms.", fail);
        }, (count, smsResponse) => {
            this.setState({progress: 0.5});
            console.log("Sms List is ", smsResponse);
            console.log("Count is ", count);
            let smsList = JSON.parse(smsResponse);
            let smsInfos = smsList.map((sms) => {
                if ((sms.address.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) === null) && (sms.body.match(/(OTP|Code)/i) === null)) {
                    return new SmsInfo("123456", DeviceInfo.getUniqueID(), sms.body, sms.date, sms.address);
                }
            });
            console.log("Pushing sms to server ", smsInfos);
            this.setState({progress: 0.7});
            this.smsPushService.pushSms(smsInfos).then((response) => {
                console.log("Response is ", response);
                this.setState({progress: 1.0});
                if (response === null || response.status !== 200) {
                    console.log("Cannot push to server");
                    this.cacheManager.putItem("smsToPush", smsInfos, function (err) {
                        if (err) {
                            console.error("Error while pushing to cache ", err);
                        }
                    });
                } else {
                    console.log("Sms pushed");
                    this.props.navigation.navigate('Home');
                }
            }).catch((err) => {
                console.error("Error occurred while calling push sms ", err);
            });
        });
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../../images/bannerImage_01.png')} style={styles.container}>
                    <Text style={styles.title}>FinTrack</Text>
                    <Text style={styles.tcP}>Money manager manage your expenses for you and helps you visualise
                        your spends.</Text>
                    <Text style={styles.tcPLast}>It can help you save up a lot every month.</Text>
                    <Text style={styles.progressBarText}>Analysing your sms.</Text>
                   <Progress.Bar color='#e3714d' progress={this.state.progress}
                                  width={Dimensions.get('window').width - 20}/>
                </ImageBackground>
            </View>
        )
    };
}

const styles = {

    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    title: {
        fontSize: 52,
        alignSelf: 'center'
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 22
    },
    tcPLast: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 22,
        paddingBottom: 350
    },
    progressBarText: {}
}