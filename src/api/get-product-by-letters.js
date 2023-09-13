import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getAllProducts() {
	return sendApiRequest(METHODS.GET, "/search/name/:letter");
}
