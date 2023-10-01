import { API_HOST, CURRENT_USER_STORAGE_ID } from "../utils/constants.js";

export const METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
};

export async function sendApiRequest(method, endpoint, requestObject) {
	const headers = {};
	headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
	headers.append("Access-Control-Allow-Credentials", "true");

	const body = requestObject ? JSON.stringify(requestObject) : undefined;
	if (requestObject) {
		headers["Content-Type"] = "application/json";
	}

	const token = localStorage.getItem(CURRENT_USER_STORAGE_ID);
	if (token) {
		headers["Authorization"] = token;
	}

	const response = await fetch(API_HOST + endpoint, {
		method,
		headers,
		body,
	});

	return await response.json();
}
