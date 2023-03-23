interface SMSNotificationOptions {
    authToken: string;
    apiUrl: string;
}
declare class SMSNotifier {
    private readonly authToken;
    private readonly apiUrl;
    constructor(options: SMSNotificationOptions);
    sendSMSNotification(msg: string, phone: any): Promise<void>;
}
export default SMSNotifier;
