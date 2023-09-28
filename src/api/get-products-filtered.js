import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getProductsFiltered(searchParams) {
	return sendApiRequest(METHODS.GET, "/search?" + searchParams);
}
