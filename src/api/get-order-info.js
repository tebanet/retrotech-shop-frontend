import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getOrderInfo(username, orderId) {
	return sendApiRequest(
		METHODS.GET,
		"/users/" + username + "/my-orders/" + orderId
	);
}
