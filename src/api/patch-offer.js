import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function patchOffer(username, orderId, order_status) {
	const requestBody = { order_status };
	return sendApiRequest(
		METHODS.PATCH,
		"/users/" + username + "/my-offers/" + orderId,
		requestBody
	);
}
