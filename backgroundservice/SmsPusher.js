import {SmsPushService} from "../service/SmsPushService";
import {SmsInfo} from "../co/SmsInfo";
import DeviceInfo from 'react-native-device-info';

module.exports = async (taskData) => {
    console.log("Task Triggered with data", taskData);
    if (!(taskData.sender.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) && (taskData.message.match(/(OTP*|Code*)/i))) {
        let smsPushService = new SmsPushService();
        let smsInfos = [];
        let smsInfo = new SmsInfo("123456", DeviceInfo.getDeviceId(), taskData.message, taskData.timeStamp, taskData.sender);
        smsInfos.push(smsInfo);
        let response = smsPushService.pushSms(smsInfos);
        if (response === null) {
            //Push to cache
        } else {
            console.log("Sms pushed");
        }
    }
};