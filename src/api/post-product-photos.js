import { API_HOST, CURRENT_USER_STORAGE_ID } from "../utils/constants.js";
import { METHODS } from "./send-api-request.js";

export async function postProductPhoto(photos) {
	const UPLOAD_URL = API_HOST + `/uploads`;

	const headers = {};
	const token = localStorage.getItem(CURRENT_USER_STORAGE_ID);
	if (token) {
		headers["Authorization"] = token;
	}

	const fetchPromises = photos.map((photo) => {
		const formData = new FormData();
		formData.append("photo", photo);

		return fetch(UPLOAD_URL, {
			method: METHODS.POST,
			headers,
			body: formData,
		});
	});

	const fetchResponses = await Promise.all(fetchPromises);

	const allOk = fetchResponses.every((response) => response.ok);

	return {
		success: allOk,
		...(!allOk && {
			error: {
				msg: "Algunas fotos no se pudieron subir...",
			},
		}),
	};
}
