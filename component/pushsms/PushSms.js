import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {SmsInfo} from "../../co/SmsInfo";
import DeviceInfo from 'react-native-device-info';
import {SmsPushService} from "../../service/SmsPushService";
import * as Progress from 'react-native-progress';

export default class PushSms extends Component {

    smsPushService = new SmsPushService();

    componentDidMount() {
        console.log("Component did mount called");
        let fetchMore = true;
        let index = 0;
        // while (fetchMore) {
            console.log("Fetch more value " + fetchMore);
            let filter = {indexFrom: index, count: 100};
            SmsAndroid.list(JSON.stringify(filter), (fail) => {
                console.log("Error occurred", fail);
            }, (count, smsResponse) => {
                console.log("Sms List is ", smsResponse);
                console.log("Count is ", count);
                let smsList = JSON.parse(smsResponse);
                let smsInfos = smsList.map((sms) => {
                    return new SmsInfo("123456", DeviceInfo.getUniqueID(), sms.body, sms.date, sms.address);
                });
                console.log("Pushing sms to server ", smsInfos);
                this.smsPushService.pushSms(smsInfos).then((response) => {
                    console.log("Response is ", response);
                    if (response === null || response.status !== 200) {
                        console.log("Cannot push to server");
                        this.setState({fetchMore: false});
                    } else {
                        console.log("Sms pushed");
                        fetchMore = ((count === 100) && (smsResponse !== null));
                        if (fetchMore) {
                            index++;
                        }
                    }
                }).catch((err) => {
                    console.error("Error occurred while calling push sms ", err);
                });
            });
        // }
    }

    render() {
        return (
            <View style={{backgroundColor: 'orange', height:Dimensions.get('window').height}}>
                <Text style={styles.titleText}>Freecharge Money Manager</Text>
                <Text style={styles.paragraphText}>Money manager manage your expenses for you and helps you visualise your spends.</Text>
                <Text style={styles.paragraphText}>It can help you save up a lot every month.</Text>
                <Text>Analysing your sms.</Text>
                <Progress.Bar progress={0.9} width={200} />
            </View>
        )
    };
}
const styles = StyleSheet.create({
    backgroundColor:{
      color:'orange'
    },
    titleText:{
        textAlign : 'center',
        paddingTop: 20,
        fontSize:25
    },
    paragraphText:{
        padding: 10
    }
});