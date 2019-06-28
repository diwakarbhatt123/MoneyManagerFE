export class SmsPushService {
    pushSms(smsInfo: any) {
        console.log("Called SMS push with smsInfo ",smsInfo);
        return fetch('https://ext-qamobile1-aws1.freecharge.in/hoh/api/smsContent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(smsInfo),
        });

    }
}