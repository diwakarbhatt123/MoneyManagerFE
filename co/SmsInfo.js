export class SmsInfo {
    userId: string;
    deviceId: string;
    msg: string;
    date: string;
    merchant: string;

    constructor(userId: string, deviceId: string, msg: string, date: string, merchant: string) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.msg = msg;
        this.date = date;
        this.merchant = merchant;
    }

}