import {SmsInfo} from "../co/SmsInfo";

export class SmsPushService {
    pushSms(smsInfo: any) {
        console.log("Called SMS push with smsInfo ",smsInfo);
        fetch('https://ext-qamobile1-aws1.freecharge.in/hoh/api/smsContent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(smsInfo),
        }).then((response) => {
            console.log("Response is ", response);
            return response.json();
        }).catch((error) => {
            console.error("Error occurred while calling sms push ", error);
        });

    }
}