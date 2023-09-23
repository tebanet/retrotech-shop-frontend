import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postNewProduct(
	product_title,
	product_image,
	category,
	price,
	description,
	place_of_sale,
	location
) {
	const requestBody = {
		product_title,
		product_image,
		category,
		price,
		description,
		place_of_sale,
		location,
	};

	return await sendApiRequest(METHODS.POST, "/products/new", requestBody);
}
