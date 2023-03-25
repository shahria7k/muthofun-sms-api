import axios, { AxiosError } from "axios";

interface SMSNotificationOptions {
	authToken: string;
	apiUrl: string;
}

const sendSMSNotification = async (options: SMSNotificationOptions, msg: string, phone: any): Promise<void> => {
	const data = {
		receiver: phone,
		message: msg,
		remove_duplicate: true,
	};

	const config = {
		headers: {
			Authorization: `Token ${options.authToken}`,
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await axios.post(`${options.apiUrl}/api/v1/send-sms`, data, config);
		console.log(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			console.error(`Error sending SMS notification: ${axiosError.message}`);
		} else {
			console.error(`Unknown error occurred: ${error}`);
		}
		throw error;
	}
};

export default sendSMSNotification;
