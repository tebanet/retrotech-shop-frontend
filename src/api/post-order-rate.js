import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function rateOrder(username, orderId, valoracion, comentaries) {
	const requestBody = {
		valoracion,
		comentaries,
	};

	console.log(username, orderId, valoracion, comentaries);

	return await sendApiRequest(
		METHODS.POST,
		"/users/" + username + "/my-orders/" + orderId + "/rate",
		requestBody
	);
}
