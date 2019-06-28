import {SmsPushService} from "../service/SmsPushService";
import {SmsInfo} from "../co/SmsInfo";
import DeviceInfo from 'react-native-device-info';
import {CacheManager} from "../cache/CacheManager";

let cacheManager = new CacheManager();

module.exports = async (taskData) => {
    console.log("Task Triggered with data", taskData);
    if ((taskData.sender.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) === null) && (taskData.message.match(/(OTP|Code)/i) === null)) {
        let smsPushService = new SmsPushService();
        cacheManager.getItem("smsToPush", function (err, value) {
            console.log("Get value from cache ", err, value);
            let smsInfos = [];
            if ((!err && err !== undefined) && (value !== null && value !== undefined)) {
                smsInfos = value;
            }
            let smsInfo = new SmsInfo("123456", DeviceInfo.getUniqueID(), taskData.message, taskData.timeStamp, taskData.sender);
            smsInfos.push(smsInfo);
            console.log("Pushing value to Server ", smsInfos);
            smsPushService.pushSms(smsInfos).then((response) => {
                if (response === null || response !== 200) {
                    cacheManager.putItem("smsToPush", smsInfos, function (err) {
                        if (err) {
                            console.error("Error occurred while pushing sms ", err);
                        }
                    });
                } else {
                    console.log("Sms pushed");
                }
            }).catch((err) => {
                console.error("Error occurred while pushing sms to server ", err);
                cacheManager.putItem("smsToPush", smsInfos, function (err) {
                    if (err) {
                        console.error("Error occurred while pushing sms ", err);
                    }
                });
            });
        });
    } else {
        console.log("Ignored message");
    }
}