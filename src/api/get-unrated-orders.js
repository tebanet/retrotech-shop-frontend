import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUnratedOrders(username) {
	return sendApiRequest(METHODS.GET, "/users/" + username + "/unrated");
}
