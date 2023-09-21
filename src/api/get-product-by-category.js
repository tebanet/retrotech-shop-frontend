import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getProductByCategory(category) {
	return sendApiRequest(METHODS.GET, "/category/" + category);
}
