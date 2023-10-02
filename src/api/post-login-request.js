import { API_HOST } from "../utils/constants";
import { toast } from "sonner";
import { METHODS, sendApiRequest } from "./send-api-request";

/* export const loginUser = async (email, password) => {
	const requestBody = { email, password };

	try {
		const response = await fetch(API_HOST + "/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		});

		if (response.ok) {
			const responseData = await response.json();
			toast.success("Bienvenido a RetroTechShop");
			return responseData.token;
		} else {
			toast.error("Usuario o contraseña incorrectos");
			console.log("Error:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Ha ocurrido un error:", error);
		return null;
	}
}; */

export async function loginUser(email, password) {
	const requestObject = { email, password };
	const response = await sendApiRequest(
		METHODS.POST,
		"/users/login",
		requestObject
	);
	console.log(response);
	if (response.status === "ok") {
		toast.success("Bienvenido a RetroTechShop");
		return response.token;
	} else {
		toast.error("Usuario o contraseña incorrectos");
		console.log("Error:", response.statusText);
		return null;
	}
}
