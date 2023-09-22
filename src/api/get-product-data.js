import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getProductData(product_id) {
	return sendApiRequest(METHODS.GET, "/products/" + product_id);
}
