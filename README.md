# Muthofun-SMSNotifier

A class for sending SMS notifications via an HTTP API.

## Installation

`npm install send-sms`

## Usage

```
import SMSNotifier from 'muthofun-sms-api';

const notifier = new SMSNotifier({ authToken: 'my-auth-token', apiUrl: 'https://sysadmin.muthobarta.com', });

notifier.sendSMSNotification('Hello, world!', '+1234567890') .then(() => { console.log('SMS notification sent'); })
.catch((err) => { console.error(`Error sending SMS notification: ${err.message}`); });
```

The SMSNotifier class takes an object with authToken and apiUrl properties as its constructor argument. You can then
call the sendSMSNotification method with the message content and phone number as its arguments. The method returns a
Promise that resolves when the SMS notification has been sent, or rejects with an error if there is a problem sending
the notification.

## API

### `new SMSNotifier(options: SMSNotificationOptions)` Creates a new instance of the SMSNotifier class.

1. options - An object with the following properties:
2. authToken - The authorization token for the API.
3. apiUrl - The URL of the API endpoint.
4. async sendSMSNotification(msg: string, phone: string): Promise<void> Sends an SMS notification via an HTTP API.
5. msg - The content of the SMS notification.
6. phone - The phone number to send the notification to.

Returns a Promise that resolves when the SMS notification has been sent, or rejects with an error if there is a problem
sending the notification.

## License

This package is licensed under the MIT License.
