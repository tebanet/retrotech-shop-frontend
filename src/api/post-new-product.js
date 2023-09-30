import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postNewProduct(
  product_title,
  category,
  price,
  description,
  status,
  place_of_sale,
  location
) {
  const requestBody = {
    product_title,
    category,
    price,
    description,
    status,
    place_of_sale,
    location,
  };

  const response = await sendApiRequest(
    METHODS.POST,
    "/products/new",
    requestBody
  );
  const data = await response.data;
  return data;
}
