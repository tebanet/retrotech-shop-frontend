import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUserProducts(username) {
	return sendApiRequest(METHODS.GET, "/users/" + username + "/products");
}
