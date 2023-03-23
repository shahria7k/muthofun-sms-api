import * as http from "http";

interface SMSNotificationOptions {
	authToken: string;
	apiUrl: string;
}

class SMSNotifier {
	private readonly authToken: string;
	private readonly apiUrl: string;

	constructor(options: SMSNotificationOptions) {
		this.authToken = options.authToken;
		this.apiUrl = options.apiUrl;
	}

	async sendSMSNotification(msg: string, phone: any): Promise<void> {
		const data = JSON.stringify({
			receiver: phone,
			message: msg,
			remove_duplicate: true,
		});

		const options = {
			hostname: this.apiUrl,
			port: 443,
			path: "/api/v1/send-sms",
			method: "POST",
			headers: {
				Authorization: `Token ${this.authToken}`,
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(data),
			},
		};

		return new Promise((resolve, reject) => {
			const req = http.request(options, (res) => {
				let responseData = "";
				res.setEncoding("utf8");
				res.on("data", (chunk) => {
					responseData += chunk;
				});
				res.on("end", () => {
					try {
						const parsedData = JSON.parse(responseData);
						console.log(parsedData);
						resolve();
					} catch (e: any) {
						console.error(`Error parsing response data: ${e.message}`);
						reject(e);
					}
				});
			});

			req.on("error", (e) => {
				console.error(`Request error: ${e.message}`);
				reject(e);
			});

			req.write(data);
			req.end();
		});
	}
}

export default SMSNotifier;
