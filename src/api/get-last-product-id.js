import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getLastUserProduct(id_seller) {
  return sendApiRequest(METHODS.GET, "/products/user/" + id_seller);
}
