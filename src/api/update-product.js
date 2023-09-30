import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function updateProduct(
  product_title,
  category,
  price,
  description,
  place_of_sale,
  location,
  product_id
) {
  try {
    const requestBody = {
      product_title,
      category,
      price,
      description,
      place_of_sale,
      location,
    };

    const response = await sendApiRequest(
      METHODS.PUT,
      `/products/update/${product_id}`,
      requestBody
    );

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
}
