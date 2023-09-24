import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUserOrders(username) {
	return sendApiRequest(METHODS.GET, "/users/" + username + "/my-orders");
}
