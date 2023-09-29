import { API_HOST } from "../utils/constants";

export const getIdByToken = async (token) => {
	const requestBody = { token };

	try {
		const response = await fetch(API_HOST + "/users/check-token", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		});

		if (response.ok) {
			const responseData = await response.json();
			return responseData;
		} else {
			console.log("Error:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Ha ocurrido un error:", error);
		return null;
	}
};
