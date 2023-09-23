import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postOrder(product_id, message, delivery_place) {
	const requestBody = {
		message,
		delivery_place,
	};

	return sendApiRequest(
		METHODS.POST,
		"/products/" + product_id + "/order",
		requestBody
	);
}
