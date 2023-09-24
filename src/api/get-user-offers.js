import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUserOffers(username) {
	return sendApiRequest(METHODS.GET, "/users/" + username + "/my-offers");
}
