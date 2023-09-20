import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUserData(username) {
	return sendApiRequest(METHODS.GET, "/users/" + username);
}
